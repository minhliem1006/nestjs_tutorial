import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { NoteModule } from './note/note.module';
import { DatabaseModule } from './database/database.module';
// import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule,UserModule, NoteModule , DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
