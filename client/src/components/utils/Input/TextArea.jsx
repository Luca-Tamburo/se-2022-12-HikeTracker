// Imports
import { Form } from "react-bootstrap";
import { Field, ErrorMessage, useField } from "formik";

// ClassNames
import classNames from "classnames";

const TextArea = ({ id, name, placeholder, disabled, className, label }) => {
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
            <Field as="textarea" id={id} name={field.name} placeholder={placeholder} className={classes} disabled={disabled} />
            <Form.Text className='text-danger'>
                <ErrorMessage name={field.name} />
            </Form.Text>
        </Form.Group>
    );
}

export default TextArea;