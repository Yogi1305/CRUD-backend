import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load .env globally

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Use DATABASE_URL
      ssl: { rejectUnauthorized: false }, // Required for Supabase
      autoLoadEntities: true,
      synchronize: true, // dev only
    }), PostModule, AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, ],
})
export class AppModule {}
