import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInitialState, User } from 'src/types/User';

const initialState: UserInitialState = {};

const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUsersSuccess: (state, action: PayloadAction<User[]>) => ({
      ...state,
      getUsersSuccess: action.payload,
    }),
    setUsersError: (state, action: PayloadAction<any>) => ({
      ...state,
      getUsersError: action.payload,
    }),
    setUsersLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      getUsersLoading: action.payload,
    }),
  },
});

export const userReducer = userSlice.reducer;

const { setUsersError, setUsersSuccess, setUsersLoading } = userSlice.actions;

export { setUsersError, setUsersSuccess, setUsersLoading };
