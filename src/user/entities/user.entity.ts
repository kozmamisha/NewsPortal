import { Category } from 'src/category/entities/category.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { News } from 'src/news/entities/news.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Category, (category) => category.user, {
    onDelete: 'CASCADE',
  })
  categories: Category[];

  @OneToMany(() => News, (news) => news.user, {
    onDelete: 'CASCADE',
  })
  news: News[];

  @OneToMany(() => Feedback, (feedback) => feedback.user, {
    onDelete: 'CASCADE',
  })
  feedback: Feedback[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
