import { ApiProperty } from '@nestjs/swagger';

export class GenerateCodeResponseDto {
    @ApiProperty({ description: 'Mã tiếp nhận được sinh', example: 'BLOOD.20241024.0001' })
    receptionCode: string;

    @ApiProperty({ description: 'Mã loại mẫu', example: 'BLOOD' })
    sampleTypeCode: string;

    @ApiProperty({ description: 'Ngày sinh mã', example: '2024-10-24' })
    date: string;

    @ApiProperty({ description: 'Số thứ tự tiếp theo', example: 1 })
    nextSequence: number;
}
