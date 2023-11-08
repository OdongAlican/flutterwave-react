import * as yup from 'yup';

export const querySchema = yup.object().shape({
    query: yup.string().required('Search text is required')
});
