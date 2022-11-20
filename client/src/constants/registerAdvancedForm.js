const UserEmail = [
    {
        id: 'signup-username',
        name: 'username',
        type: 'text',
        placeholder: 'Insert your username',
        label: 'Username',
    },
    {
        id: 'signup-email',
        name: 'email',
        type: 'email',
        placeholder: 'Insert your email',
        label: 'Email',
    }
]

const NameSurname = [
    {
        id: 'signup-name',
        name: 'name',
        type: 'text',
        placeholder: 'Insert your name',
        label: 'Name',
    },
    {
        id: 'signup-surname',
        name: 'surname',
        type: 'text',
        placeholder: 'Insert your surname',
        label: 'Surname',
    },
]

const PhoneNumber = [
    {
        id: 'signup-number',
        name: 'phoneNumber',
        type: 'text',
        placeholder: 'Insert your phone number',
        label: 'phoneNumber',
    },
]

const Password = [
    {
        id: 'signup-password',
        name: 'password',
        type: 'password',
        placeholder: 'Insert your password',
        label: 'Password',
    },
    {
        id: 'signup-confirmation-password',
        name: 'passwordConfirmation',
        type: 'password',
        placeholder: 'Confirm your password',
        label: 'Confirm password',
    },
]

const registerAdvancedForm = [
    UserEmail,
    NameSurname,
    PhoneNumber,
    Password
]

export default registerAdvancedForm;