import { rest } from 'msw';
import { getUsers } from './UserHandler';
import { mockApiEndPoint } from 'src/utils/MockApiEndPoint';

export const handlers = [rest.get(mockApiEndPoint.getUsers, getUsers)];
