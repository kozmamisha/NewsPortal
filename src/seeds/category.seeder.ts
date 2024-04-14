import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';

export default class UserSeeder implements Seeder {
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(Category);
    await repository.insert([
      {
        title: 'Seeded title 1',
      },
    ]);

    const userFactory = await factoryManager.get(Category);
    await userFactory.save();
  }
}
