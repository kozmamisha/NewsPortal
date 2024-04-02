import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>,
  ) {}

  async create(feedbackDto: CreateFeedbackDto, id: number): Promise<Feedback> {
    const newFeedback = {
      name: feedbackDto.name,
      message: feedbackDto.message,
      user: { id },
    };

    if (!newFeedback) {
      throw new BadRequestException('Error creating feedback!');
    }

    return await this.feedbackRepository.save(newFeedback);
  }

  
  async findAll(id: number) {
    const feedback = await this.feedbackRepository.find({
      where: {
        user: { id },
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return feedback;
  }

  async findOne(id: number) {
    const feedback = await this.feedbackRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!feedback) {
      throw new NotFoundException('This new is not found!');
    }

    return feedback;
  }
}
