import { SampleReceptionService } from './sample-reception.service';
import { CreateSampleReceptionDto } from './dto/commands/create-sample-reception.dto';
import { GetSampleReceptionsDto } from './dto/queries/get-sample-receptions.dto';
import { GenerateCodeDto } from './dto/queries/generate-code.dto';
import { SampleReceptionResponseDto } from './dto/responses/sample-reception-response.dto';
import { GenerateCodeResponseDto } from './dto/responses/generate-code-response.dto';
import { CurrentUser as ICurrentUser } from '../../common/interfaces/current-user.interface';
export declare class SampleReceptionController {
    private readonly sampleReceptionService;
    constructor(sampleReceptionService: SampleReceptionService);
    createSampleReception(createDto: CreateSampleReceptionDto, currentUser: ICurrentUser): Promise<import("../../common/builders/response.builder").BaseResponse<{
        id: string;
        receptionCode: string;
    }>>;
    deleteSampleReception(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<{
        message: string;
    }>>;
    getSampleReceptions(query: GetSampleReceptionsDto): Promise<import("../../common/builders/response.builder").BaseResponse<import("./sample-reception.service").GetSampleReceptionsResult>>;
    getTodayReceptions(): Promise<import("../../common/builders/response.builder").BaseResponse<SampleReceptionResponseDto[]>>;
    generateCodePreview(query: GenerateCodeDto): Promise<import("../../common/builders/response.builder").BaseResponse<GenerateCodeResponseDto>>;
    getCodeGenerationConfig(sampleTypeId: string): Promise<import("../../common/builders/response.builder").BaseResponse<any>>;
    getSampleReceptionById(id: string): Promise<import("../../common/builders/response.builder").BaseResponse<SampleReceptionResponseDto>>;
}
