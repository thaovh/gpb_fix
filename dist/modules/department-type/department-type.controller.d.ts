import { DepartmentTypeService } from './department-type.service';
import { CreateDepartmentTypeDto } from './dto/commands/create-department-type.dto';
import { UpdateDepartmentTypeDto } from './dto/commands/update-department-type.dto';
import { GetDepartmentTypesDto } from './dto/queries/get-department-types.dto';
import { SearchDepartmentTypesDto } from './dto/queries/search-department-types.dto';
import { DepartmentTypeResponseDto } from './dto/responses/department-type-response.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
export declare class DepartmentTypeController {
    private readonly departmentTypeService;
    constructor(departmentTypeService: DepartmentTypeService);
    createDepartmentType(createDepartmentTypeDto: CreateDepartmentTypeDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        id: string;
    }>>;
    updateDepartmentType(id: string, updateDepartmentTypeDto: UpdateDepartmentTypeDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    deleteDepartmentType(id: string, hardDelete?: string): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getDepartmentTypes(query: GetDepartmentTypesDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./department-type.service").GetDepartmentTypesResult>>;
    searchDepartmentTypes(searchDepartmentTypesDto: SearchDepartmentTypesDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./department-type.service").GetDepartmentTypesResult>>;
    getDepartmentTypeById(id: string, includeDeleted?: string): Promise<import("../../common/builders/response.builder").BaseResponse<DepartmentTypeResponseDto>>;
    getDepartmentTypesStats(): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
    reorderDepartmentTypes(): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getDepartmentTypesWithStats(query: GetDepartmentTypesDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./department-type.service").GetDepartmentTypesResult>>;
}
