import { userRepository } from '../../../databases/sequelize';
import { User } from '../../../databases/models/user.model';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(userRepository);
  }

  getUserById = async (id: string) => {
    return this.getRecordByField({ id });
  };
}
