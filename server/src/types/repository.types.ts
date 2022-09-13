import { User } from '../databases/models/user.model';
import { Repository } from 'sequelize-typescript';

export type RepositoryType = Repository<User>;
