import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(4, {
    message: 'Min length 4 symbols',
  })
  name: string;

  @IsString()
  @MinLength(4, {
    message: 'Min length 4 symbols',
  })
  description: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'Min length 4 symbols' })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(4, { message: 'Min length 4 symbols' })
  description?: string;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
