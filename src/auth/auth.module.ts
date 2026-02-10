// auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/post/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}), // 🔥 REQUIRED to load .env variables
    TypeOrmModule.forFeature([User]), // 🔥 REQUIRED
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    // this import is necessary to use the JwtService in AuthService
  ],
  // this import is necessary to use the User repository in AuthService

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
