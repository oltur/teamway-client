import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import AuthenticatedUser from "./AuthenticatedUser";

export interface AuthState {
  authenticatedUser: string | null
}

const initialState: AuthState = {
  authenticatedUser: null,
};



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    set: (state, action: PayloadAction<AuthenticatedUser>) => {
      state.authenticatedUser = JSON.stringify(action.payload);
    },
  },
});

export const { set } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthenticatedUser = (state: RootState) => {
  if(!!state.auth?.authenticatedUser) {
    return JSON.parse(state.auth.authenticatedUser) as AuthenticatedUser;
  }
  return new AuthenticatedUser()
}

export default authSlice.reducer;
