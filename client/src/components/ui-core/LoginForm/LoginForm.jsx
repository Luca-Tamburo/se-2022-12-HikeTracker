/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/ui-core/HikeCard
* File:            HikeCard.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

//Imports
// import { Row, Col, Card } from 'react-bootstrap';

const LoginForm = () => {
    return (
        <div className="Auth-form-container">
                    <form className="Auth-form">
                        <div className="Auth-form-content">
                            <div className="form-group mt-3 me-5">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control mt-1 border border-4 rounded-pill"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group mt-3 me-5">
                                <label cls>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1 br-4 border border-4 rounded-pill"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div className="d-flex gap-2 mt-3 rounded-pill">
                                <button type="submit" className="btn btn-primary border rounded-pill">
                                    Submit
                                </button>
                            </div>
                            <p className="forgot-password text-right mt-2">
                                Forgot <a href="#">password?</a>
                            </p>
                        </div>
                    </form>
                </div>
    );
}

export default LoginForm;