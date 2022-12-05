/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          components/utils/Input
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

const Input = ({ id, name, type, placeholder, disabled, className, label, ...props }) => {
    const [field, meta] = useField(name);

    const classes = classNames({
        'form-control text-dark bg-gray rounded-3 p-3 border': true,
        'is-invalid': meta.touched && meta.error,
        'is-valid': meta.touched && !meta.error,
        'bg-base opacity-50': disabled
    })

    return (
        <Form.Group className={className}>
            <Form.Label htmlFor={id} className="fw-semibold text-primary-dark" >{label}</Form.Label>
            <Field id={id} name={field.name} type={type} placeholder={placeholder} className={classes} disabled={disabled} {...props} />
            {(meta.touched && meta.error) &&
                <Form.Text data-testid='error-message' className='text-danger'>
                    <ErrorMessage name={field.name} />
                </Form.Text>
            }
        </Form.Group>
    );
}
export default Input;