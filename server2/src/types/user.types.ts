import { Optional } from 'sequelize';

export interface UserAttributes {
  id: string;
  username: string;
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}
