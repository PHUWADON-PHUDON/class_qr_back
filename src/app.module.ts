import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LavelModule } from './lavel/lavel.module';
import { PrismaModule } from './prisma/prisma.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [LavelModule, PrismaModule, SubjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
