import { Module } from '@nestjs/common';
import { LavelService } from './lavel.service';
import { LavelController } from './lavel.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LavelController],
  providers: [LavelService],
})
export class LavelModule {}
