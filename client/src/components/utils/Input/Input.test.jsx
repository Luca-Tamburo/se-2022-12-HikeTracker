import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { Formik } from 'formik'

import Input from './Input'

jest.mock('react-bootstrap', () => {
    const Form = ({ children, ...props }) => <form {...props}>{children}</form>

    Form.Group = ({ children }) => <div>{children}</div>
    Form.Label = ({ children, ...props }) => <label {...props}>{children}</label>
    Form.Text = ({ children, ...props }) => <p {...props}>{children}</p>

    return ({ Form })
})

const testProps = {
    id: "test-input",
    name: "testInput",
    type: "text",
    placeholder: "This is a test",
    label: "Test Input"
}

const Component = () => {
    return (
        <Formik>
            <Input {...testProps} />
        </Formik>
    )
}

const setup = () => render(<Component />, { wrapper: MemoryRouter })

beforeEach(setup)

describe("Input component", () => {
    it("Component is correctly rendered", () => {
        expect(screen.getByRole('textbox', { name: testProps.label })).toBeInTheDocument()
    })

    it("Input name is correctly set", () => {
        expect(screen.getByRole('textbox', { name: testProps.label })).toHaveAttribute("name", testProps.name)
    })
    
    it("Input type is correctly set", () => {
        expect(screen.getByRole('textbox', { name: testProps.label })).toHaveAttribute("type", testProps.type)
    })
})