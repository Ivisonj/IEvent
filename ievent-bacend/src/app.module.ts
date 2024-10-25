import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './shared/infra/database/prisma/prisma-service.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/user/use-cases/auth/auth.module';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
