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

const Input = ({ id, name, type, placeholder, className, label }) => {
    const [field, meta] = useField(name);

    const classes = classNames({
        'form-control text-dark bg-gray rounded-3 p-3 border rounded-pill': true,
        'is-invalid': meta.touched && meta.error,
        'is-valid': meta.touched && !meta.error
    })

    if (type !== 'select') {
        return (
            <Form.Group className={className} controlId={id}>
                <Form.Label className="fw-semibold fst-italic" >{label}</Form.Label>
                <Field id={id} name={field.name} type={type} placeholder={placeholder} className={classes} />
                <Form.Text className='text-danger'>
                    <ErrorMessage name={field.name} />
                </Form.Text>
            </Form.Group>
        );
    } else {
        return (
            <Form.Group className={className} controlId={id}>
                <Form.Label className="fw-semibold fst-italic" >{label}</Form.Label>
                <Field id={id} name={field.name} as={type} type={type} placeholder={placeholder} className={classes} >
                    <option value=''>Choose the hike difficulty</option>
                    <option value='Tourist'>Tourist</option>
                    <option value='Hiker'>Hiker</option>
                    <option value='Professional Hiker'>Professional Hiker</option>
                </Field>
                <Form.Text className='text-danger'>
                    <ErrorMessage name={field.name} />
                </Form.Text>
            </Form.Group>
        );
    }
}

export default Input;