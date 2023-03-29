import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from './activity.controller';
import { ActivityRepository } from './activity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ ActivityRepository ]),
    AuthModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
