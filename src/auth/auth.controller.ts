import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthResponseDto, SigninDto, SignupDto } from './signup.dtos';
import bcrypt from 'node_modules/bcryptjs';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('/')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signup")
    async signup(@Body() signup:SignupDto): Promise<AuthResponseDto > {
         
        return this.authService.signup(signup);
    }
    @Post("/signin")
    async signin(@Body() signin:SigninDto): Promise<{message:string, access_token:string,id:string, email:string, name:string} > {
        return this.authService.signin(signin);
    }
    @UseGuards(AuthGuard)
    @Get("/test")
    test():string{
        return "test successful";
    }
}

