import { ApiProperty } from '@nestjs/swagger';

export class UserInfoDto {
    @ApiProperty({
        description: 'Unique identifier of the user',
        example: 'user-uuid-here'
    })
    id: string;

    @ApiProperty({
        description: 'Username of the user',
        example: 'john_doe'
    })
    username: string;

    @ApiProperty({
        description: 'Email address of the user',
        example: 'john.doe@example.com'
    })
    email: string;

    @ApiProperty({
        description: 'First name of the user',
        example: 'John'
    })
    firstName: string;

    @ApiProperty({
        description: 'Last name of the user',
        example: 'Doe'
    })
    lastName: string;

    @ApiProperty({
        description: 'Full name of the user',
        example: 'John Doe'
    })
    fullName: string;

    @ApiProperty({
        description: 'Whether the user account is active',
        example: true
    })
    isActive: boolean;
}

export class AuthResponseDto {
    @ApiProperty({
        description: 'JWT access token for API authentication',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    })
    accessToken: string;

    @ApiProperty({
        description: 'JWT refresh token for getting new access tokens',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyLWlkIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    })
    refreshToken: string;

    @ApiProperty({
        description: 'User information',
        type: UserInfoDto
    })
    user: UserInfoDto;
}
