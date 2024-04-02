import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private readonly NewsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto, id: number) {
    const newNews = {
      title: createNewsDto.title,
      description: createNewsDto.description,
      user: { id },
      category: { id: +createNewsDto.category },
    };

    if (!newNews) {
      throw new BadRequestException('Something went wrong...');
    }

    return await this.NewsRepository.save(newNews);
  }

  async findAll(id: number) {
    const news = await this.NewsRepository.find({
      where: {
        user: { id },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return news;
  }

  async findOne(id: number) {
    const news = await this.NewsRepository.findOne({
      where: { id },
      relations: {
        user: true,
        category: true,
      },
    });

    if (!news) {
      throw new NotFoundException('This new is not found!');
    }

    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    const news = await this.NewsRepository.findOne({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException('This new is not found!');
    }

    return await this.NewsRepository.update(id, updateNewsDto);
  }

  async remove(id: number) {
    const news = await this.NewsRepository.findOne({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException('This new is not found!');
    }

    return await this.NewsRepository.delete(id);
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const news = await this.NewsRepository.find({
      where: {
        user: { id },
      },
      relations: {
        category: true,
        user: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    return news;
  }
}
