import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, MinLength, MaxLength, Matches, Min, Max, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWardDto {
    @ApiProperty({
        description: 'Mã xã (5 chữ số)',
        example: '01001',
        minLength: 5,
        maxLength: 5,
        pattern: '^[0-9]{5}$'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(5)
    @Matches(/^[0-9]{5}$/, { message: 'Mã xã phải là 5 chữ số' })
    wardCode: string;

    @ApiProperty({
        description: 'Tên xã',
        example: 'Phường Phúc Xá',
        minLength: 2,
        maxLength: 200
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(200)
    wardName: string;

    @ApiProperty({
        description: 'ID của tỉnh',
        example: '550e8400-e29b-41d4-a716-446655440001',
        format: 'uuid'
    })
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    provinceId: string;

    @ApiProperty({
        description: 'Tên viết tắt của xã',
        example: 'PX',
        minLength: 2,
        maxLength: 50
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    shortName: string;

    @ApiProperty({
        description: 'Thứ tự sắp xếp',
        example: 1,
        minimum: 1,
        maximum: 999
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(999)
    sortOrder: number;

    @ApiProperty({
        description: 'Trạng thái hoạt động',
        example: true,
        default: true
    })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean = true;
}
