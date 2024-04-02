import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class CreateFeedbackDto {
  @IsNotEmpty()
  name: string;

  @MinLength(6, { message: 'Message must be longer then 10 symbols' })
  message: string;

  user: User;
}
