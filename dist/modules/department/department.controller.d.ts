import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/commands/create-department.dto';
import { UpdateDepartmentDto } from './dto/commands/update-department.dto';
import { GetDepartmentsDto } from './dto/queries/get-departments.dto';
import { SearchDepartmentsDto } from './dto/queries/search-departments.dto';
import { DepartmentResponseDto } from './dto/responses/department-response.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    createDepartment(createDto: CreateDepartmentDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        id: string;
    }>>;
    updateDepartment(id: string, updateDto: UpdateDepartmentDto, currentUser: CurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    deleteDepartment(id: string, hardDelete?: string): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getDepartments(query: GetDepartmentsDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./dto/queries/get-departments.dto").GetDepartmentsResult>>;
    searchDepartments(query: SearchDepartmentsDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./dto/queries/get-departments.dto").GetDepartmentsResult>>;
    getDepartmentsByBranch(branchId: string): Promise<import("../../common/builders/response.builder").BaseResponse<DepartmentResponseDto[]>>;
    getDepartmentsByType(typeId: string): Promise<import("../../common/builders/response.builder").BaseResponse<DepartmentResponseDto[]>>;
    getDepartmentHierarchy(): Promise<import("../../common/builders/response.builder").BaseResponse<DepartmentResponseDto[]>>;
    getDepartmentChildren(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<DepartmentResponseDto[]>>;
    getDepartmentsWithStats(query: GetDepartmentsDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./dto/queries/get-departments.dto").GetDepartmentsResult>>;
    getDepartmentById(id: string, includeDeleted?: string): Promise<import("../../common/builders/response.builder").BaseResponse<DepartmentResponseDto>>;
    getStatsOverview(): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
    getStatsByBranch(branchId: string): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
    getStatsByType(typeId: string): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
    reorderDepartments(departmentIds: string[]): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
}
