import { SampleTypeService } from './sample-type.service';
import { CreateSampleTypeDto } from './dto/commands/create-sample-type.dto';
import { UpdateSampleTypeDto } from './dto/commands/update-sample-type.dto';
import { GetSampleTypesDto } from './dto/queries/get-sample-types.dto';
import { SearchSampleTypesDto } from './dto/queries/search-sample-types.dto';
import { SampleTypeResponseDto } from './dto/responses/sample-type-response.dto';
import { CurrentUser as ICurrentUser } from '../../common/interfaces/current-user.interface';
export declare class SampleTypeController {
    private readonly sampleTypeService;
    constructor(sampleTypeService: SampleTypeService);
    createSampleType(createDto: CreateSampleTypeDto, currentUser: ICurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        id: string;
    }>>;
    updateSampleType(id: string, updateDto: UpdateSampleTypeDto, currentUser: ICurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    deleteSampleType(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getSampleTypes(query: GetSampleTypesDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./sample-type.service").GetSampleTypesResult>>;
    getActiveSampleTypes(): Promise<import("../../common/builders/response.builder").BaseResponse<SampleTypeResponseDto[]>>;
    searchSampleTypes(searchDto: SearchSampleTypesDto): Promise<import("../../common/builders/response.builder").BaseResponse<SampleTypeResponseDto[]>>;
    getSampleTypeById(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<SampleTypeResponseDto>>;
}
