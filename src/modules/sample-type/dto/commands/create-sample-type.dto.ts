import { IsString, IsNotEmpty, IsOptional, IsNumber, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSampleTypeDto {
    @ApiProperty({ description: 'Mã loại mẫu', example: 'BLOOD' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(50)
    typeCode: string;

    @ApiProperty({ description: 'Tên loại mẫu', example: 'Mẫu máu' })
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(200)
    typeName: string;

    @ApiPropertyOptional({ description: 'Tên viết tắt', example: 'Máu' })
    @IsString()
    @IsOptional()
    @MaxLength(100)
    shortName?: string;

    @ApiPropertyOptional({ description: 'Mô tả', example: 'Mẫu máu để xét nghiệm' })
    @IsString()
    @IsOptional()
    @MaxLength(2000)
    description?: string;

    @ApiPropertyOptional({ description: 'Số thứ tự', example: 1 })
    @IsNumber()
    @IsOptional()
    sortOrder?: number;
}
