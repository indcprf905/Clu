import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Request() req, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(req.user.sub, createOrderDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.ordersService.findAll(req.user.sub, req.user.role);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.ordersService.findOne(id, req.user.sub, req.user.role);
  }

  @Patch(':id/deliver')
  deliver(
    @Param('id') id: string,
    @Request() req,
    @Body() body: { deliveryFiles: string[] },
  ) {
    return this.ordersService.deliver(id, req.user.sub, body.deliveryFiles);
  }

  @Patch(':id/accept')
  accept(@Param('id') id: string, @Request() req) {
    return this.ordersService.accept(id, req.user.sub);
  }

  @Patch(':id/cancel')
  cancel(
    @Param('id') id: string,
    @Request() req,
    @Body() body: { reason: string },
  ) {
    return this.ordersService.cancel(id, req.user.sub, body.reason);
  }
}
