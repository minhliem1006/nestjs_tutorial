import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User, UserSchema } from '../model/auth.model';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { JwtStrategy } from "./strategy";
@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Ensure this line is there
        JwtModule.register({}),
        ConfigModule.forRoot(),
      ],
    controllers:[AuthController],
    providers:[AuthService, JwtStrategy]
})
export class AuthModule {}