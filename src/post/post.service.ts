import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './post.entity';
import { Userdata } from './postuser.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // renamed for clarity
  ) {}

  createUser(user: Userdata): Promise<User> {
    console.log('Creating user:', user); // Debug log to check incoming data
    return this.userRepository.save(user);
  }
  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
async updateUserById(id: string,data:Userdata): Promise< User | null > {
  const user = await this.userRepository.findOne({ where: { id } });


  if (!user) {
    return   null ;
  }
 if (data.email) {
    console.log('Updating email for user ID:', id, 'New email:', data.email); // Debug log to check email update
   user.email = data.email;
 }
  return  user ;
}

async deleteUserById(id: string): Promise<{ message: string }> {
  const user = await this.userRepository.findOne({ where: { id } });
  if (!user) {
    return { message: 'User not found' };
  }

  await this.userRepository.remove(user);  // actually deletes the row
  return { message: 'User deleted successfully' };
}




}
