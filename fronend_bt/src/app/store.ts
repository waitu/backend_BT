import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import { backTestApi } from '../services/uploadConfig.ts';

export const store = configureStore({
    reducer :{
        [backTestApi.reducerPath]:backTestApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backTestApi.middleware),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export default store;