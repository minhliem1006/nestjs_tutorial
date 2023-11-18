import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
          useFactory: () => ({
            uri: 'mongodb+srv://liem_new_project:mmIHeWuVlO7GIeMm@cluster0.ggfsjxl.mongodb.net/users',
          }),
        }),
    ],
})
export class DatabaseModule {}