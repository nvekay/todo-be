import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { getTypeOrmConfig } from 'src/config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
