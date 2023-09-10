import { createSlice } from '@reduxjs/toolkit';
import { IEntry } from './interface';

interface IEntriesState {
    data: IEntry[];
}

const initialState: IEntriesState = {
    data: []
}

export const entrySlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {
        loadData: (state, action) => {
            state.data = action.payload;
        },
    }
})

const { reducer, actions } = entrySlice

export const { loadData } = actions

export default reducer;
