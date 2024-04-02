// import { Seeder, SeederFactoryManager } from 'typeorm-extension';
// import { DataSource } from 'typeorm';
// import { Category } from '../category/entities/category.entity';
// import { User } from '../user/entities/user.entity';

// export default class CategorySeeder implements Seeder {
//   public async run(
//     dataSource: DataSource,
//     factoryManager: SeederFactoryManager,
//   ): Promise<void> {
//     await dataSource.query('TRUNCATE "category" RESTART IDENTITY;');

//     const repository = dataSource.getRepository(Category);
//     const userRepository = dataSource.getRepository(User);
//     const user = await userRepository.find();

//     await repository.insert({
//       title: 'Test seeds category 1',
//       user: user[0],
//     });
//   }
// }

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
