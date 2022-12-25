/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/views/Register
* File:            RegisterRole.test.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';

// Components
import RegisterRole from './RegisterRole';
import Register from './Register';
import { RegisterForm } from '../../components/ui-core/RegisterForm/RegisterForm';


// Contexts
import { AuthContext } from "../../contexts/AuthContext";
jest.mock('react-bootstrap', () => {

    const RegisterForm = (props) => {
        return (
            <div>{props.children}</div>
        )
    }
    const RegisterFormAdvanced = (props) => {
        return (
            <div>{props.children}</div>
        )
    }
    const Col = (props) => {
        return (
            <div>{props.children}</div>
        )
    }

    const Row = (props) => {
        return (
            <div>{props.children}</div>
        )
    }


    const Button = ({ children, ...props }) => {
        return (
            <button {...props}>{children}</button>
        )
    }

    const Form = ({ children, ...props }) => {
        return (
            <form noValidate={true} {...props}>{children}</form>
        )
    }




    Form.Group = ({ children }) => <div>{children}</div>
    Form.Label = ({ children, ...props }) => <label {...props}>{children}</label>
    Form.Text = ({ children, ...props }) => <p {...props}>{children}</p>

    return ({ Button, Col, RegisterForm, RegisterFormAdvanced, Form, Row });
}
)
// Mock custom components
const mockInput = jest.fn();
jest.mock('../../components/utils/Input/Input', () => (props) => {
    mockInput();
    return <mock-Input data-testid='Input' placeholder={props.placeholder} />
})

const value = {
    default: {
        userInfo: null,
        isloggedIn: false
    },
    localGuide: {
        userInfo: {
            name: "aldo",
            role: "localGuide",
            gender: "M"
        },
        isloggedIn: true
    }
}

describe('Register Role', () => {

    it('shows the hiker form', async () => {
        const history = createMemoryHistory();
        const state = { Role: "hiker" }
        history.push("/", state);
        render(
            <AuthContext.Provider value={value.default}>
                <Router location={history.location} navigator={history}>
                    <RegisterRole />
                </Router>
            </AuthContext.Provider>);
        expect(screen.getByText(/Signup/i)).toBeInTheDocument();
        expect(screen.getAllByTestId('Input')).toHaveLength(4);
    })

    it('shows the advanced form', async () => {
        const history = createMemoryHistory();
        const state = { Role: "local guide" }
        history.push("/", state);
        render(
            <AuthContext.Provider value={value.default}>
                <Router location={history.location} navigator={history}>
                    <RegisterRole />
                </Router>
            </AuthContext.Provider>);
        expect(screen.getByText(/Signup/i)).toBeInTheDocument();
        expect(screen.getAllByTestId('Input')).toHaveLength(7);
    })

    it('send back to home if logged', async () => {
        const history = createMemoryHistory();
        const state = { Role: "local guide" }
        history.push("/", state);
        render(
            <AuthContext.Provider value={value.localGuide}>
                <Router location={history.location} navigator={history}>
                    <RegisterRole />
                </Router>
            </AuthContext.Provider>);
        expect(history.location.pathname).toBe('/')
    })

    it('onSubmit is called after validation', async () => {
        const history = createMemoryHistory();
        const state = { Role: "hiker" };
        history.push("/", state);
        render(<AuthContext.Provider value={value.default}>
            <Router location={history.location} navigator={history}>
                <RegisterRole />
            </Router>
        </AuthContext.Provider>);

        const username = screen.getByPlaceholderText(/username/i);
        const email = screen.getByPlaceholderText(/email/i);
        const password = screen.getByPlaceholderText(/insert your password/i);
        const confPassword = screen.getByPlaceholderText(/confirm your password/i);
        const submitButton = screen.getByRole('button', { name: /sign up/i })
        await userEvent.type(username, 'testUser');
        await userEvent.type(email, 'testEmail@gmail.com');
        await userEvent.type(password, 'testPassword1! ');
        await userEvent.type(confPassword, 'testPassword1! ');

        //expect(submitButton).toBeEnabled();
        await userEvent.click(submitButton);
        expect(history.location.pathname).toBe('/')


    })
})