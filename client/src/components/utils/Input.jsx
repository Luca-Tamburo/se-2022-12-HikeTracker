/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          components/utils
* File:            Input.jsx
* 
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { Form } from "react-bootstrap";
import { Field, ErrorMessage, useField } from "formik";

// ClassNames
import classNames from "classnames";

const Input = ({ id, name, type, placeholder, className, label }) => {
    const [field, meta] = useField(name);

    const classes = classNames({
        'form-control text-dark bg-gray rounded-3 p-3 border rounded-pill': true,
        'is-invalid': meta.touched && meta.error,
        'is-valid': meta.touched && !meta.error
    })

    return (
        <Form.Group className={className} controlId={id}>
            <Form.Label className="fw-semibold fst-italic" >{label}</Form.Label>
            <Field id={id} name={field.name} type={type} placeholder={placeholder} className={classes} />
            <Form.Text className='text-danger'>
                <ErrorMessage name={field.name} />
            </Form.Text>
        </Form.Group>
    );
}

export default Input;