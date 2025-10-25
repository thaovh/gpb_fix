import { IsString, IsOptional, IsNumber, MinLength, MaxLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSampleTypeDto {
    @ApiPropertyOptional({ description: 'Mã loại mẫu', example: 'BLOOD' })
    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(50)
    typeCode?: string;

    @ApiPropertyOptional({ description: 'Tên loại mẫu', example: 'Mẫu máu' })
    @IsString()
    @IsOptional()
    @MinLength(2)
    @MaxLength(200)
    typeName?: string;

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
