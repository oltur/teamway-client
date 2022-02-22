import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import testReducer from '../features/test/testSlice';

export const store = configureStore({
  reducer: {
    counter: testReducer,
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
