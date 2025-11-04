import { Controller, Get, Post, Put, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { WorkflowHistoryService } from '../services/workflow-history.service';
import { StartWorkflowDto } from '../dto/commands/start-workflow.dto';
import { TransitionStateDto } from '../dto/commands/transition-state.dto';
import { UpdateCurrentStateDto } from '../dto/commands/update-current-state.dto';
import { GetWorkflowHistoryDto } from '../dto/queries/get-workflow-history.dto';
import { WorkflowHistoryResponseDto, GetWorkflowHistoryResult } from '../dto/responses/workflow-history-response.dto';
import { ResponseBuilder } from '../../../../common/builders/response.builder';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { CurrentUser as ICurrentUser } from '../../../../common/interfaces/current-user.interface';

@ApiTags('Workflow History')
@Controller('workflow-history')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class WorkflowHistoryController {
    constructor(private readonly workflowHistoryService: WorkflowHistoryService) { }

    // ========== COMMANDS (Write Operations) ==========

    @Post('start')
    @ApiOperation({ summary: 'Bắt đầu workflow mới' })
    @ApiResponse({ status: 201, description: 'Tạo workflow thành công' })
    @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
    @ApiResponse({ status: 409, description: 'Workflow đã được khởi tạo' })
    async startWorkflow(
        @Body() dto: StartWorkflowDto,
        @CurrentUser() currentUser: ICurrentUser
    ) {
        const id = await this.workflowHistoryService.startWorkflow(dto, currentUser);
        return ResponseBuilder.success({ id }, 201);
    }

    @Post('transition')
    @ApiOperation({ summary: 'Chuyển workflow sang state mới' })
    @ApiResponse({ status: 201, description: 'Chuyển state thành công' })
    @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy workflow' })
    async transitionState(
        @Body() dto: TransitionStateDto,
        @CurrentUser() currentUser: ICurrentUser
    ) {
        const id = await this.workflowHistoryService.transitionState(dto, currentUser);
        return ResponseBuilder.success({ id }, 201);
    }

    @Put('current/:storedServiceReqId')
    @ApiOperation({ summary: 'Cập nhật thông tin current state' })
    @ApiParam({ name: 'storedServiceReqId', description: 'ID của Service Request' })
    @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy workflow' })
    async updateCurrentState(
        @Param('storedServiceReqId') storedServiceReqId: string,
        @Query('storedServiceId') storedServiceId: string | undefined,
        @Body() dto: UpdateCurrentStateDto,
        @CurrentUser() currentUser: ICurrentUser
    ) {
        await this.workflowHistoryService.updateCurrentState(
            storedServiceReqId,
            storedServiceId || null,
            dto,
            currentUser
        );
        return ResponseBuilder.success({ message: 'Current state updated successfully' });
    }

    // ========== QUERIES (Read Operations) ==========

    @Get('current/:storedServiceReqId')
    @ApiOperation({ summary: 'Lấy current state của workflow' })
    @ApiParam({ name: 'storedServiceReqId', description: 'ID của Service Request' })
    @ApiResponse({ status: 200, description: 'Lấy thành công', type: WorkflowHistoryResponseDto })
    @ApiResponse({ status: 404, description: 'Không tìm thấy workflow' })
    async getCurrentState(
        @Param('storedServiceReqId') storedServiceReqId: string,
        @Query('storedServiceId') storedServiceId: string | undefined
    ) {
        const result = await this.workflowHistoryService.getCurrentState(
            storedServiceReqId,
            storedServiceId || null
        );
        return ResponseBuilder.success(result);
    }

    @Get('current/all/:storedServiceReqId')
    @ApiOperation({ summary: 'Lấy tất cả current states của một Service Request' })
    @ApiParam({ name: 'storedServiceReqId', description: 'ID của Service Request' })
    @ApiResponse({ status: 200, description: 'Lấy thành công' })
    async getCurrentStatesByServiceReq(
        @Param('storedServiceReqId') storedServiceReqId: string
    ) {
        const result = await this.workflowHistoryService.getCurrentStatesByServiceReq(storedServiceReqId);
        return ResponseBuilder.success(result);
    }

    @Get('history/:storedServiceReqId')
    @ApiOperation({ summary: 'Lấy lịch sử workflow' })
    @ApiParam({ name: 'storedServiceReqId', description: 'ID của Service Request' })
    @ApiResponse({ status: 200, description: 'Lấy thành công' })
    async getHistory(
        @Param('storedServiceReqId') storedServiceReqId: string,
        @Query('storedServiceId') storedServiceId: string | undefined
    ) {
        const result = await this.workflowHistoryService.getHistory(
            storedServiceReqId,
            storedServiceId || null
        );
        return ResponseBuilder.success(result);
    }

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách workflow history với filter' })
    @ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
    async getAll(@Query() query: GetWorkflowHistoryDto) {
        const result = await this.workflowHistoryService.getAll(query);
        return ResponseBuilder.success({
            items: result.items,
            pagination: {
                total: result.total,
                limit: result.limit,
                offset: result.offset,
                hasNext: result.offset + result.limit < result.total,
                hasPrev: result.offset > 0,
            },
        });
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy workflow history theo ID' })
    @ApiParam({ name: 'id', description: 'ID của workflow history' })
    @ApiResponse({ status: 200, description: 'Lấy thành công', type: WorkflowHistoryResponseDto })
    @ApiResponse({ status: 404, description: 'Không tìm thấy workflow history' })
    async getById(@Param('id') id: string) {
        const result = await this.workflowHistoryService.getById(id);
        return ResponseBuilder.success(result);
    }
}

