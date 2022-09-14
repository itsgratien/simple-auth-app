import * as http from 'http';
import { sequelize } from './databases/sequelize';
import app from './app';

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, async () => {
  await sequelize.sync();
  // eslint-disable-next-line no-console
  console.log(`Server started on PORT ${port}`);
});
