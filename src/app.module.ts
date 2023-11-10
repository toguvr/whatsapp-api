import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [MessagesModule, SessionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
