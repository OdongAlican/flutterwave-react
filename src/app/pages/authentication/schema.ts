import * as yup from 'yup'

export const schema = yup.object().shape({
    email: yup.string().required('email number is required'),
    password: yup.string().required('Password is required').max(10, 'Length of password must not be greater than 10'),
})
