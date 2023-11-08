import * as yup from 'yup'

export const schema = yup.object().shape({
    email: yup.string().required('Email number is required').email(),
    password: yup.string().required('Password is required').max(10, 'Length of password must not be greater than 10'),
});

export const registerSchema = yup.object().shape({
    email: yup.string().required('Email number is required').email(),
    password: yup.string().required('Password is required').max(10, 'Length of password must not be greater than 10'),
    firstname: yup.string().required('First Name is required'),
    lastname: yup.string().required('Last Name is required'),
    phonenumber: yup.string().required('Phone Number is required'),
    location: yup.string().required('Location is required'),
    username: yup.string().required('User Name is required'),
});