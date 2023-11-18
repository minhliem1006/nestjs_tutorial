import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Request} from 'express'
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from 'src/auth/guard';
import { User } from 'src/model/auth.model';
@Controller('users')
export class UserController {
    // @UseGuards(AuthGuard('jwt'))   
    @UseGuards(MyJwtGuard)   
    
    @Get('me')
    // me(@Req() request:Request){
    //     //no protect 
    //     // we need "Guard" to protect
    //     console.log(request.user);
    //     return request.user
    // }
    // custom decorator
    me(@GetUser() user:User){
        //no protect 
        // we need "Guard" to protect
        console.log(user);
        return user
    }
}
