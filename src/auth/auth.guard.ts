import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
    
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request:Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization']?.split(' ');
    if (!authHeader || authHeader[0] !== 'Bearer' || !authHeader[1]) {
      return false;
    }
    return true;
  }

}
