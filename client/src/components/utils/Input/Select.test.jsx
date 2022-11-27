/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/utils/Input
* File:            Select.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Formik } from 'formik'

// Components
import Select from './Select'

jest.mock('react-bootstrap', () => {
    const Form = ({ children, ...props }) => <form {...props}>{children}</form>

    Form.Group = ({ children }) => <div>{children}</div>
    Form.Label = ({ children, ...props }) => <label {...props}>{children}</label>
    Form.Text = ({ children, ...props }) => <p {...props}>{children}</p>

    return ({ Form })
})

const props = {
    id: "test-select",
    name: "testSelect",
    label: "Test Input"
}

const options = [
    { value: "1", label: "option 1" },
    { value: "2", label: "option 2" },
    { value: "3", label: "option 3" },
]

const customDefaultOption = {
    defaultValue: "10",
    defaultLabel: "Default option"
}

const initialValues = { testSelect: "" }
const initialTouched = { testSelect: true }
const initialErrors = { testSelect: "Validation error" }

const initialProps = {
    default: { initialValues },
    error: { initialValues, initialTouched, initialErrors },
    success: { initialValues, initialTouched },
}

const Wrapped = {
    Default: () => (
        <Formik {...initialProps.default}>
            <Select {...props} />
        </Formik>
    ),
    WithChildren: () => (
        <Formik {...initialProps.default}>
            <Select {...props}>
                {options.map(opt => <option key={opt.value} value={opt.value}>
                    {opt.label}
                </option>)}
            </Select>
        </Formik>
    ),
    CustomDefaultOption: () => (
        <Formik {...initialProps.default}>
            <Select {...props} {...customDefaultOption} />
        </Formik>
    ),
    Disabled: () => (
        <Formik {...initialProps.default}>
            <Select {...props} disabled />
        </Formik>
    ),
    Success: () => (
        <Formik {...initialProps.success}>
            <Select {...props} />
        </Formik>
    ),
    Error: () => (
        <Formik {...initialProps.error}>
            <Select {...props} />
        </Formik>
    )
}

const setup = {
    default: () => render(<Wrapped.Default />, { wrapper: MemoryRouter }),
    withChildren: () => render(<Wrapped.WithChildren />, { wrapper: MemoryRouter }),
    customDefaultOption: () => render(<Wrapped.CustomDefaultOption />, { wrapper: MemoryRouter }),
    disabled: () => render(<Wrapped.Disabled />, { wrapper: MemoryRouter }),
    success: () => render(<Wrapped.Success />, { wrapper: MemoryRouter }),
    error: () => render(<Wrapped.Error />, { wrapper: MemoryRouter }),
}

describe('Select component', () => {
    it('Component is correctly rendered', () => {
        setup.default()
        expect(screen.getByLabelText(props.label)).toBeInTheDocument()
    })

    it.each(Object.keys(props).filter(attr => attr !== "label"))
        ('Select %s is correctly set',
            (attribute) => {
                setup.default()
                expect(screen.getByLabelText(props.label)).toHaveAttribute(attribute, props[attribute])
            })

    it("Default option is correctly rendered", () => {
        setup.default()
        expect(within(screen.getByRole('combobox'))
            .getAllByRole('option'))
            .toHaveLength(1)
    })

    it("Children options are correctly rendered", () => {
        setup.withChildren()
        expect(within(screen.getByRole('combobox'))
            .getAllByRole('option'))
            .toHaveLength(1 + options.length)
    })

    it.each(options)("Child option $value is correctly set", (opt) => {
        setup.withChildren()
        expect(within(screen.getByRole('combobox'))
            .getByRole('option', { name: new RegExp(opt.label, "i") }))
            .toHaveAttribute("value", opt.value)
    })

    it("Default option has value set to 0 if it is not set", () => {
        setup.default()
        expect(within(screen.getByRole('combobox'))
            .getByRole('option'))
            .toHaveAttribute('value', "0")
    })

    it("Default option has empty label if it is not set", () => {
        setup.default()
        expect(within(screen.getByRole('combobox'))
            .getByRole('option').innerHTML)
            .toBe("")
    })

    it("Default option label is correctly set", () => {
        setup.customDefaultOption()
        expect(within(screen.getByRole('combobox'))
            .getByRole('option').innerHTML)
            .toBe(customDefaultOption.defaultLabel)
    })

    it("Default option value is correctly set", () => {
        setup.customDefaultOption()
        expect(within(screen.getByRole('combobox'))
            .getByRole('option'))
            .toHaveAttribute('value', customDefaultOption.defaultValue)
    })

    it("Input is not disabled if prop is not true", () => {
        setup.default()
        expect(screen.getByLabelText(props.label).disabled).toBe(false)
        expect(screen.getByLabelText(props.label)).not.toHaveClass("opacity-50")
    })

    it("Select is disabled if prop is true", () => {
        setup.disabled()
        expect(screen.getByLabelText(props.label).disabled).toBe(true)
        expect(screen.getByLabelText(props.label)).toHaveClass("opacity-50")
    })

    it("Error style is applied to the select when a validation error occurs", () => {
        setup.error()
        expect(screen.getByLabelText(props.label)).toHaveClass("is-invalid")
        expect(screen.getByLabelText(props.label)).not.toHaveClass("is-valid")
    })

    it("Success style is applied to the input when there is no validation error", () => {
        setup.success()
        expect(screen.getByLabelText(props.label)).toHaveClass("is-valid")
        expect(screen.getByLabelText(props.label)).not.toHaveClass("is-invalid")
    })

    it("Error message is not visable when there is no validation error", () => {
        setup.default()
        expect(screen.queryByTestId(/error-message/i)).not.toBeInTheDocument()
    })

    it("Error message is visable when there is a validation error", () => {
        setup.error()
        const error = screen.queryByTestId(/error-message/i)
        expect(error.innerHTML).toBe(initialErrors.testSelect)
        expect(error).toHaveClass("text-danger")
    })
})