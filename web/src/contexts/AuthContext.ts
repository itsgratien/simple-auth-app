import React from 'react';
import { AuthContextState } from 'src/types/User';

export const AuthContext = React.createContext<AuthContextState>({});

export default AuthContext;
