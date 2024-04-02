import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn({ name: 'feedback_id' })
  id: number;

  @Column()
  name: string;
  
  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.feedback)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
