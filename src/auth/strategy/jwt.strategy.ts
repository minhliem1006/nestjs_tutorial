import { Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/model/auth.model";

export class JwtStrategy extends PassportStrategy(Strategy,'jwt') {
    constructor(@Inject(ConfigService) configService:ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    ){
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get('JWT_SECRET')
        })
    }
   async validate(payload: {sub, email:string}){
        // const 
        // tra ve thong tin cho nay
        const user = await this.userModel.findOne({ _id: payload.sub}).exec();
        console.log("user::",user);
        console.log(JSON.stringify(payload));
        const newUser:any = user.toObject()
        delete newUser.hashedPassword
        return newUser
    }
}