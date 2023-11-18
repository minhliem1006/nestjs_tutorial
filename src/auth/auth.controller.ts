import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDTO } from "./dto";
@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){
    }
    @Get()
    getAllUser(){
        return this.authService.getAllUser();
    }
    @Post("/register") 
    // register(@Req() request:Request){
    register(@Body() body:AuthDTO){
        console.log("body:",body);
        try {
            return this.authService.register(body);
        } catch (error) {
            console.log("error::",error);
                        
        }

    }   
    // register(@Body('email') email:string,
    //     @Body('password') password:string,
    // ){
    //     console.log("email:",email);
    //     console.log("password:",password);
    //     return this.authService.register();
    // }   
    @Post("/login") 
    login(@Body() body:AuthDTO){
        return this.authService.login(body);
    }
}