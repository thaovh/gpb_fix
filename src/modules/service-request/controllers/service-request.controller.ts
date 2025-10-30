import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ServiceRequestService } from '../services/service-request.service';
import { GetServiceRequestDto } from '../dto/commands/get-service-request.dto';
import { GetServiceRequestsDto } from '../dto/queries/get-service-requests.dto';
import { SearchServiceRequestsDto } from '../dto/queries/search-service-requests.dto';
import { ServiceRequestResponseDto } from '../dto/responses/service-request-response.dto';
import { ServiceRequestsListResponseDto, ServiceRequestStatsDto } from '../dto/responses/service-requests-list-response.dto';
import { ResponseBuilder } from '../../../common/builders/response.builder';

@ApiTags('service-requests')
@ApiBearerAuth('JWT-auth')
@Controller('service-requests')
export class ServiceRequestController {
    constructor(private readonly serviceRequestService: ServiceRequestService) { }

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
}
