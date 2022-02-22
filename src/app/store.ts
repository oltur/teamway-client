import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';

let initialState = localStorage.getItem('reduxState')

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: initialState == null?{auth: {authenticatedUser: ""}}:JSON.parse(initialState)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

store.subscribe(()=>{
  let t = JSON.stringify(store.getState())
  localStorage.setItem('reduxState', t)
})