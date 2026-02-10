import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/post/post.entity';
import { SignupDto, SigninDto } from './signup.dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(signup: SignupDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: signup.email },
    });
    console.log('Existing user:', existingUser); // Debugging line
    if (existingUser) {
      throw new UnauthorizedException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(signup.password, 10);

    const user = this.userRepository.create({
      ...signup,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);

    const payload = { sub: savedUser.id, email: savedUser.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Signup successful',
      access_token: token,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        name: savedUser.name,
      },
    };
  }

  async signin(signin: SigninDto) {
    const user = await this.userRepository.findOne({
      where: { email: signin.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      signin.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return {
      message: 'Signin successful',
      access_token: token,
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
