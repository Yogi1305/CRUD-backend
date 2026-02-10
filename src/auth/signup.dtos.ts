import { IsString, Matches, MinLength } from "class-validator";

export class SignupDto {
    @IsString()
    name: string;
    @IsString()
    email: string
    @IsString()
    @MinLength(6)
    // @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, { message: 'Password must be at least 6 characters long and contain at least one letter and one number' })
    password: string;
}

// dtos work when class validator is used to validate the data coming from the client. It is a way to ensure that the data is in the correct format and meets certain criteria before it is processed by the application. By using class-validator, you can define validation rules for each property of the DTO, such as required fields, minimum and maximum lengths, and custom validation logic. This helps to prevent invalid data from being processed and can improve the overall security and reliability of the application.
// class transform is used to transform the data coming from the client into the correct format before it is processed by the application. For example, if the client sends a string representation of a date, class-transform can be used to convert it into a Date object that can be easily manipulated and stored in the database. This helps to ensure that the data is in the correct format and can be processed correctly by the application.

// configure in main.ts
// import { ValidationPipe } from '@nestjs/common';
// app.useGlobalPipes(new ValidationPipe());  

export class SigninDto {
    @IsString()
    email: string
    @IsString()
    password: string;
}

export class AuthResponseDto {
    message: string
    access_token: string
    user: {
        id: string
        email: string
        name: string
    }
}