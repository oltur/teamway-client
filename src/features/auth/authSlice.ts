import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
  authenticatedUser: string
}

const initialState: AuthState = {
  authenticatedUser: "",
};



export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      state.authenticatedUser = action.payload;
    },
  },
});

export const { set } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthenticatedUser = (state: RootState) => {
  if(!!state.auth?.authenticatedUser) {
    return state.auth.authenticatedUser;
  }
  return ""
}

export default authSlice.reducer;
