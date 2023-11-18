import { ForbiddenException, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../model/auth.model';
import { AuthDTO } from "./dto";
import * as argon from 'argon2';
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config"

@Injectable({})
export class AuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService:JwtService,
    private configService: ConfigService
    ) {}

    async register(authDTO:AuthDTO){
        try {
            const hashedPassword = await argon.hash(authDTO.password);
            const newUser = new this.userModel({email:authDTO.email, hashedPassword });
            await newUser.save();
            console.log("newUser::",newUser);
            return {
              message: `register an user hashedPassword: ${hashedPassword}`,
              data:newUser
            }
        } catch (error) {
            console.log("error:",error)
            return {
                message: `register an user has error`,
                error:error
              }
        }
      }     
    async login(authDTO:AuthDTO){
        const user:any = await this.userModel.findOne({email:authDTO.email }).exec();
        console.log("user",user);
        if(!user) {
            throw new ForbiddenException('User not found')
        }

        const passwordMatched = await argon.verify(user.hashedPassword,authDTO.password);
        console.log("passwordMatched:",passwordMatched);
        if(!passwordMatched) {
            throw new ForbiddenException('pass incorrect')
        }
        console.log("user222",user);
        const newUser = user.toObject();
        delete newUser.hashedPassword;

        return await this.signJwtString(user._id,user.email)

        // return {
        //     message: "login user",
        //     data:newUser
        // }
    }
    async getAllUser() : Promise<User[]> {
        // return this.userModel.find().exec();
        return this.userModel.find().select('_id email createdAt').exec();
    }

    async signJwtString(userId,email):Promise<{accessToken:string}> {
        const payload = {
            sub:userId,
            email:email,
        }
        const jwtString = await this.jwtService.signAsync(payload,{
            expiresIn:'10m',
            secret:this.configService.get('JWT_SECRET')
        }) 
        return {
            accessToken: jwtString
        }
    }
}