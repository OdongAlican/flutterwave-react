import { createSlice } from '@reduxjs/toolkit';

export interface IUserState {
    data: {
        firstName: string,
        lastName: string,
        accesstoken: string,
        username: string
        documentIds: string
    };
}

const initialState: IUserState = {
    data: {
        firstName: '',
        lastName: '',
        accesstoken: '',
        username: '',
        documentIds: ''
    }
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loadUser: (state, action) => {
            state.data = action.payload;
        },
    }
})

const { reducer, actions } = userSlice

export const { loadUser } = actions

export default reducer;
