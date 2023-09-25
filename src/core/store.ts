import {
    configureStore,
    ThunkAction,
    Action
} from '@reduxjs/toolkit';
import entryReducer from '../app/pages/listDocuments/documents_slice';
import userReducer from '../app/pages/authentication/user_slice';

export const store = configureStore({
    reducer: {
        entryState: entryReducer,
        userState: userReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
