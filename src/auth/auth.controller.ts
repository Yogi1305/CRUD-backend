import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthResponseDto, SigninDto, SignupDto } from './signup.dtos';
import bcrypt from 'node_modules/bcryptjs';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import type{ Response } from 'express';


@Controller('/')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/signup")
    async signup(@Body() signup:SignupDto): Promise<AuthResponseDto > {
         
        return this.authService.signup(signup);
    }
    // @Post("/signin")
    // async signin(@Body() signin:SigninDto): Promise<{message:string, access_token:string,id:string, email:string, name:string} > {
    //     return this.authService.signin(signin);
    // }
     @Post('signin')
     async signin(
  @Body() signinDto: SigninDto,
  @Res({ passthrough: true }) response: Response,
) {
  const { token, user } = await this.authService.signin(signinDto);

  response.cookie('access_token', token, {
    httpOnly: true,
    secure: true, // Set to true in production
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return {
    message: 'Signin successful',
    id: user.id,
    email: user.email,
    name: user.name,
  };
}


    @UseGuards(AuthGuard)
    @Get("/test")
    test():string{
        return "test successful";
    }
}

