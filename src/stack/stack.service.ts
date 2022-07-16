import dataSource from '../database/databaseConfig';
import Stack from './entities/stack.repository';

export default class StacksService {
  static async stacksList() {
    const stacks = await dataSource.getRepository(Stack).find();

    return stacks;
  }
}
