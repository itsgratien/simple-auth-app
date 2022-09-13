export interface User {
  id: string;
  username: string;
}

export interface AuthContextState {
  isauthenticated?: boolean;
}

export interface UserInitialState {
  readonly getUsersSuccess?: User[];
  readonly getUsersLoading?: boolean;
  readonly getUsersError?: any;
}
