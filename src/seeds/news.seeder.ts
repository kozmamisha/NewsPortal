import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { News } from '../news/entities/news.entity';
import { Category } from '../category/entities/category.entity';

export default class NewsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    await dataSource.query('TRUNCATE "news" RESTART IDENTITY;');

    const repository = dataSource.getRepository(News);
    const categoryRepository = dataSource.getRepository(Category);
    const categories = await categoryRepository.find();

    await repository.insert({
      title: 'Test seeds title 1',
      description: 'This is about seeded description',
      category: categories[0],
    });
  }
}
