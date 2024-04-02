import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import NewsSeeder from '../seeds/news.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([News, Category])],
  controllers: [NewsController],
  providers: [NewsService, CategoryService, NewsSeeder],
})
export class NewsModule {}
