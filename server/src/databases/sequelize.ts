import { Sequelize } from 'sequelize-typescript';
import config from 'config';
import { User } from './models/user.model';
import path from 'path';

const dbUri: string =
  config.get('node_env') === 'test'
    ? config.get('app.database.testUri')
    : config.get('app.database.uri');

export const sequelize = new Sequelize(dbUri, {
  models: [path.join(__dirname, './models/*.model.ts')],
  repositoryMode: true
});

export const userRepository = sequelize.getRepository(User);
