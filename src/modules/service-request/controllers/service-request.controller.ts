import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ServiceRequestService } from '../services/service-request.service';
import { StoredServiceRequestService } from '../services/stored-service-request.service';
import { GetServiceRequestDto } from '../dto/commands/get-service-request.dto';
import { StoreServiceRequestDto } from '../dto/commands/store-service-request.dto';
import { EnterResultDto } from '../dto/commands/enter-result.dto';
import { ReviewResultDto } from '../dto/commands/review-result.dto';
import { ApproveResultDto } from '../dto/commands/approve-result.dto';
import { QcResultDto } from '../dto/commands/qc-result.dto';
import { GetServiceRequestsDto } from '../dto/queries/get-service-requests.dto';
import { SearchServiceRequestsDto } from '../dto/queries/search-service-requests.dto';
import { ServiceRequestResponseDto } from '../dto/responses/service-request-response.dto';
import { StoredServiceRequestResponseDto } from '../dto/responses/stored-service-request-response.dto';
import { StoredServiceRequestDetailResponseDto } from '../dto/responses/stored-service-request-detail-response.dto';
import { ServiceRequestsListResponseDto, ServiceRequestStatsDto } from '../dto/responses/service-requests-list-response.dto';
import { ResponseBuilder } from '../../../common/builders/response.builder';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { CurrentUser as ICurrentUser } from '../../../common/interfaces/current-user.interface';

@ApiTags('service-requests')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('service-requests')
export class ServiceRequestController {
    constructor(
        private readonly serviceRequestService: ServiceRequestService,
        private readonly storedServiceRequestService: StoredServiceRequestService,
    ) { }

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách yêu cầu dịch vụ' })
    @ApiResponse({ status: 200, type: ServiceRequestsListResponseDto })
    async getServiceRequests(@Query() query: GetServiceRequestsDto) {
        const result = await this.serviceRequestService.getServiceRequests(query);
        return ResponseBuilder.successWithPagination(result.serviceRequests, result.total, result.limit, result.offset);
    }

    @Get('search')
    @ApiOperation({ summary: 'Tìm kiếm yêu cầu dịch vụ' })
    @ApiResponse({ status: 200, type: ServiceRequestsListResponseDto })
    async searchServiceRequests(@Query() query: SearchServiceRequestsDto) {
        const result = await this.serviceRequestService.searchServiceRequests(query);
        return ResponseBuilder.successWithPagination(result.serviceRequests, result.total, result.limit, result.offset);
    }

    @Get('stats')
    @ApiOperation({ summary: 'Thống kê yêu cầu dịch vụ' })
    @ApiResponse({ status: 200, type: ServiceRequestStatsDto })
    async getServiceRequestStats(@Query() query: GetServiceRequestsDto) {
        const result = await this.serviceRequestService.getStatistics();
        return ResponseBuilder.success(result);
    }

    // Removed LIS mapping specific endpoints for now

    // Removed patientId-based endpoint; using patientCode endpoint below

    @Get('patient-code/:patientCode')
    @ApiOperation({ summary: 'Lấy yêu cầu dịch vụ theo mã bệnh nhân' })
    @ApiParam({ name: 'patientCode', description: 'Mã bệnh nhân', example: '0003151004' })
    @ApiResponse({ status: 200, type: ServiceRequestsListResponseDto })
    async getServiceRequestsByPatientCode(
        @Param('patientCode') patientCode: string,
        @Query() query: GetServiceRequestsDto
    ) {
        const result = await this.serviceRequestService.getServiceRequestsByPatient(patientCode);
        return ResponseBuilder.success(result);
    }

    // Removed get by numeric ID endpoint; using code-based endpoints

    @Get('code/:serviceReqCode')
    @ApiOperation({ summary: 'Lấy chi tiết yêu cầu dịch vụ theo mã' })
    @ApiParam({ name: 'serviceReqCode', description: 'Mã yêu cầu dịch vụ', example: '000055537395' })
    @ApiResponse({ status: 200, type: ServiceRequestResponseDto })
    async getServiceRequestByCode(@Param('serviceReqCode') serviceReqCode: string) {
        const result = await this.serviceRequestService.getServiceRequestByCode({ serviceReqCode });
        return ResponseBuilder.success(result);
    }

    // Removed with-details by ID; code-based details endpoint kept below

    @Get('code/:serviceReqCode/with-details')
    @ApiOperation({ summary: 'Lấy chi tiết yêu cầu dịch vụ theo mã với mapping LIS đầy đủ' })
    @ApiParam({ name: 'serviceReqCode', description: 'Mã yêu cầu dịch vụ', example: '000055537395' })
    @ApiResponse({ status: 200, type: ServiceRequestResponseDto })
    async getServiceRequestByCodeWithDetails(@Param('serviceReqCode') serviceReqCode: string) {
        const result = await this.serviceRequestService.getServiceRequestByCode({ serviceReqCode });
        return ResponseBuilder.success(result);
    }

    @Post('store')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Lưu trữ Service Request từ HIS vào LIS database' })
    @ApiResponse({ status: 201, description: 'Lưu trữ thành công', type: StoredServiceRequestResponseDto })
    @ApiResponse({ status: 409, description: 'Service Request đã tồn tại' })
    @ApiResponse({ status: 404, description: 'Service Request không tìm thấy' })
    async storeServiceRequest(
        @Body() dto: StoreServiceRequestDto,
        @CurrentUser() currentUser: ICurrentUser,
    ) {
        const result = await this.storedServiceRequestService.storeServiceRequest(dto, currentUser);
        return ResponseBuilder.success(result, HttpStatus.CREATED);
    }

    @Get('stored/:id')
    @ApiOperation({ summary: 'Lấy chi tiết Service Request đã lưu theo ID' })
    @ApiParam({ name: 'id', description: 'ID của Service Request đã lưu', example: 'f32c11f9-cab8-4f72-9776-5b41a1bc89e8' })
    @ApiResponse({ status: 200, description: 'Lấy thành công', type: StoredServiceRequestDetailResponseDto })
    @ApiResponse({ status: 404, description: 'Service Request không tìm thấy' })
    async getStoredServiceRequestById(
        @Param('id') id: string,
    ) {
        const result = await this.storedServiceRequestService.getStoredServiceRequestById(id);
        return ResponseBuilder.success(result);
    }

    @Put('stored/:storedReqId/services/:serviceId/result')
    @ApiOperation({ summary: 'Nhập/cập nhật kết quả xét nghiệm' })
    @ApiParam({ name: 'storedReqId', description: 'ID của Service Request đã lưu' })
    @ApiParam({ name: 'serviceId', description: 'ID của Service/Test' })
    @ApiResponse({ status: 200, description: 'Nhập kết quả thành công' })
    @ApiResponse({ status: 404, description: 'Service Request hoặc Service không tìm thấy' })
    @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
    async enterResult(
        @Param('storedReqId') storedReqId: string,
        @Param('serviceId') serviceId: string,
        @Body() dto: EnterResultDto,
        @CurrentUser() currentUser: ICurrentUser,
    ) {
        const result = await this.storedServiceRequestService.enterResult(storedReqId, serviceId, dto, currentUser);
        return ResponseBuilder.success(result);
    }

    @Post('stored/:storedReqId/services/:serviceId/result/review')
    @ApiOperation({ summary: 'Review kết quả xét nghiệm' })
    @ApiParam({ name: 'storedReqId', description: 'ID của Service Request đã lưu' })
    @ApiParam({ name: 'serviceId', description: 'ID của Service/Test' })
    @ApiResponse({ status: 200, description: 'Review thành công' })
    @ApiResponse({ status: 404, description: 'Service Request hoặc Service không tìm thấy' })
    @ApiResponse({ status: 400, description: 'Kết quả chưa được nhập' })
    async reviewResult(
        @Param('storedReqId') storedReqId: string,
        @Param('serviceId') serviceId: string,
        @Body() dto: ReviewResultDto,
        @CurrentUser() currentUser: ICurrentUser,
    ) {
        const result = await this.storedServiceRequestService.reviewResult(storedReqId, serviceId, dto, currentUser);
        return ResponseBuilder.success(result);
    }

    @Post('stored/:storedReqId/services/:serviceId/result/approve')
    @ApiOperation({ summary: 'Phê duyệt kết quả xét nghiệm' })
    @ApiParam({ name: 'storedReqId', description: 'ID của Service Request đã lưu' })
    @ApiParam({ name: 'serviceId', description: 'ID của Service/Test' })
    @ApiResponse({ status: 200, description: 'Phê duyệt thành công' })
    @ApiResponse({ status: 404, description: 'Service Request hoặc Service không tìm thấy' })
    @ApiResponse({ status: 400, description: 'Kết quả chưa được review' })
    async approveResult(
        @Param('storedReqId') storedReqId: string,
        @Param('serviceId') serviceId: string,
        @Body() dto: ApproveResultDto,
        @CurrentUser() currentUser: ICurrentUser,
    ) {
        const result = await this.storedServiceRequestService.approveResult(storedReqId, serviceId, dto, currentUser);
        return ResponseBuilder.success(result);
    }

    @Post('stored/:storedReqId/services/:serviceId/result/qc')
    @ApiOperation({ summary: 'Kiểm tra Quality Control' })
    @ApiParam({ name: 'storedReqId', description: 'ID của Service Request đã lưu' })
    @ApiParam({ name: 'serviceId', description: 'ID của Service/Test' })
    @ApiResponse({ status: 200, description: 'Kiểm tra QC thành công' })
    @ApiResponse({ status: 404, description: 'Service Request hoặc Service không tìm thấy' })
    async qcResult(
        @Param('storedReqId') storedReqId: string,
        @Param('serviceId') serviceId: string,
        @Body() dto: QcResultDto,
        @CurrentUser() currentUser: ICurrentUser,
    ) {
        const result = await this.storedServiceRequestService.qcResult(storedReqId, serviceId, dto, currentUser);
        return ResponseBuilder.success(result);
    }
}
