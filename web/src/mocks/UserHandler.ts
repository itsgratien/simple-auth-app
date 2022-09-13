import { RestRequest, ResponseFunction, RestContext } from 'msw';
import { faker } from '@faker-js/faker';

export const getUsers = (
  _req: RestRequest,
  res: ResponseFunction,
  ctx: RestContext,
) => {
  const users = [
    {
      username: faker.name.fullName(),
      id: Math.random(),
    },
    {
      username: faker.name.fullName(),
      id: Math.random(),
    },
    {
      username: faker.name.fullName(),
      id: Math.random(),
    },
    {
      username: faker.name.fullName(),
      id: Math.random(),
    },
  ];

  return res(ctx.status(200), ctx.json({ data: users }), ctx.delay(3000));
};
