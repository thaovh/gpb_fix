import { GetDepartmentsDto } from './get-departments.dto';
declare const SearchDepartmentsDto_base: import("@nestjs/common").Type<Partial<GetDepartmentsDto>>;
export declare class SearchDepartmentsDto extends SearchDepartmentsDto_base {
    keyword: string;
    isActive?: boolean;
}
export {};
