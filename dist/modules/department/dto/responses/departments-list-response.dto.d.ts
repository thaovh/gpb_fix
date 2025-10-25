import { DepartmentResponseDto } from './department-response.dto';
export declare class DepartmentsListResponseDto {
    departments: DepartmentResponseDto[];
    total: number;
    limit: number;
    offset: number;
}
