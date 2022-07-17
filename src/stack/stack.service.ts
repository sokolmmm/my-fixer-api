import dataSource from '../database/databaseConfig';
import Stack from './entities/stack.repository';
import { ICreateStackPayload } from '../types/interface';
import { NotFoundError } from '../utils/errors';

export default class StacksService {
  static async stacksList() {
    const stacks = await dataSource.getRepository(Stack).createQueryBuilder('stack').getMany();

    return stacks;
  }

  static async createStack(payload: ICreateStackPayload) {
    const stack = await dataSource.createEntityManager().save(Stack, {
      ...payload,
    });

    return stack;
  }

  static async retrieveStackById(stackId: string) {
    const stack = await dataSource
      .getRepository(Stack)
      .createQueryBuilder('stack')
      .where({ id: +stackId })
      .getOne();

    if (!stack) throw new NotFoundError(`Stack with id: ${stackId} doesn't exist`);

    return stack;
  }
}
