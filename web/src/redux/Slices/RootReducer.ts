import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from './UserSlice';

const rootReducer = combineReducers({ userReducer });

export default rootReducer;
