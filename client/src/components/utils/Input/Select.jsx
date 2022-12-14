/*
* -------------------------------------------------------------------- 
*
* Package:         client
* Module:          src/components/utils/Input
* File:            Select.jsx
*
* Copyright (c) 2022 - se2022-Team12
* All rights reserved.
* --------------------------------------------------------------------
*/

// Imports
import { Form } from "react-bootstrap";
import classNames from "classnames";
import { Field, ErrorMessage, useField } from "formik";

const Select = ({ id, name, defaultValue = 0, defaultLabel = "", disabled, label, className, children }) => {
    const [field, meta] = useField(name);

    const classes = classNames({
        'form-select text-dark bg-gray rounded-3 p-3 border': true,
        'is-invalid': meta.touched && meta.error,
        'is-valid': meta.touched && !meta.error,
        'bg-base opacity-50': disabled
    })

    return (
        <Form.Group className={className}>
            <Form.Label htmlFor={id} className="fw-semibold">{label}</Form.Label>
            <Field as="select" id={id} name={name} className={classes} disabled={disabled}>
                <option value={defaultValue}>{defaultLabel}</option>
                {children}
            </Field>
            {(meta.touched && meta.error) &&
                <Form.Text data-testid='error-message' className='text-danger'>
                    <ErrorMessage name={field.name} />
                </Form.Text>
            }
        </Form.Group>
    );
}

export default Select