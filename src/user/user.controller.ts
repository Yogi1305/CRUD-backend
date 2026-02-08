import { Controller, Get } from "@nestjs/common";

@Controller('user')
export class UserController {

  @Get('check')
  getCheck() {
    return "server is running";
  }

  @Get('profile')
  getProfile() {
    return "user profile";
  }

  @Get('all')
  getAllUsers() {
    return "all users";
  }
}
