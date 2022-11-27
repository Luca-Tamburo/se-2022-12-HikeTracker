/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          components/utils/Input
* File:            TextArea.test.jsx
* 
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { Formik } from 'formik'

// Components
import TextArea from './Input'

jest.mock('react-bootstrap', () => {
    const Form = ({ children, ...props }) => <form {...props}>{children}</form>

    Form.Group = ({ children }) => <div>{children}</div>
    Form.Label = ({ children, ...props }) => <label {...props}>{children}</label>
    Form.Text = ({ children, ...props }) => <p {...props}>{children}</p>

    return ({ Form })
})

const props = {
    id: "test-input",
    name: "testInput",
    placeholder: "This is a test",
    label: "Test Input"
}

const initialValues = { testInput: "" };
const initialTouched = { testInput: true };
const initialErrors = { testInput: "Validation error" };

const initialProps = {
    default: { initialValues },
    success: { initialValues, initialTouched },
    error: { initialValues, initialTouched, initialErrors },
}

const Component = {
    Default: () => {
        return (
            <Formik {...initialProps.default}>
                <TextArea {...props} />
            </Formik>
        )
    },
    Disabled: () => {
        return (
            <Formik {...initialProps.default}>
                <TextArea {...props} disabled />
            </Formik>
        )
    },
    Success: () => {
        return (
            <Formik {...initialProps.success}>
                <TextArea {...props} />
            </Formik>
        )
    },
    Error: () => {
        return (
            <Formik {...initialProps.error}>
                <TextArea {...props} />
            </Formik>
        )
    },
}

const setup = {
    default: () => render(<Component.Default />, { wrapper: MemoryRouter }),
    disabled: () => render(<Component.Disabled />, { wrapper: MemoryRouter }),
    success: () => render(<Component.Success />, { wrapper: MemoryRouter }),
    error: () => render(<Component.Error />, { wrapper: MemoryRouter }),
}

describe("TextArea component", () => {
    it("is correctly rendered", () => {
        setup.default();
        expect(screen.getByRole('textbox', { name: props.label })).toBeInTheDocument()
    })

    it.each(Object.keys(props).filter(attr => attr !== 'label'))
        ("%s is correctly set", (attribute) => {
            setup.default();
            expect(screen.getByLabelText(props.label)).toHaveAttribute(attribute, props[attribute])
        })

    it('is not disable if props is not true', () => {
        setup.default();
        expect(screen.getByLabelText(props.label).disabled).toBe(false);
    })

    it('is disable if props is true', () => {
        setup.disabled();
        expect(screen.getByLabelText(props.label).disabled).toBe(true);
    })

    it('error style is applied when a validation error occurs', () => {
        setup.error();
        expect(screen.getByLabelText(props.label)).toHaveClass('is-invalid');
        expect(screen.getByLabelText(props.label)).not.toHaveClass('is-valid');
    })

    it('success style is applied when a validation error occurs', () => {
        setup.success();
        expect(screen.getByLabelText(props.label)).toHaveClass('is-valid');
        expect(screen.getByLabelText(props.label)).not.toHaveClass('is-invalid');
    })

    it('error message is not showed if there is no validation error', () => {
        setup.default();
        expect(screen.queryByTestId(/error-message/i)).not.toBeInTheDocument();
    })

    it('error message is showed if there is validation error', () => {
        setup.error();
        expect(screen.getByTestId(/error-message/i).innerHTML).toBe(initialErrors.testInput)
    })
    it('user is able to type and change input value', async () => {
        setup.default();
        await userEvent.type(screen.getByLabelText(props.label), "New value")
        expect(screen.getByLabelText(props.label)).toHaveAttribute("value", "New value")
    })
})