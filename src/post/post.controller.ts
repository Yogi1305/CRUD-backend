import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import type { Userdata } from './postuser.interface';
import { User } from './post.entity';
import { PostService } from './post.service';

@Controller('user')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  createUser(@Body() user: Userdata): Promise<User> {
    return this.postService.createUser(user);
  }
  @Get("data")
    async findAllUsers():Promise<{ message: string; data: User[] }> {
    const user= await this.postService.findAllUsers();
    return {
        message:"All users data",
        data:user
    }
    }
 

@Patch(":id")
async updateUser(
  @Param('id') id: string,               // get ID from URL
  @Body() data: Userdata,       // get fields to update from request body
): Promise<{ message: string; data: User | null }> {
  console.log('Received update request for user ID:', id, 'Data to update:', data);

  const updatedUser = await this.postService.updateUserById(id, data);

  return {
    message: updatedUser ? "User updated successfully" : "User not found",
    data: updatedUser,
  };

 
}
@Delete(":id")
async deleteUser(@Param('id') id: string): Promise<{ message: string }> {
  const result = await this.postService.deleteUserById(id);
  return result;
}
}

