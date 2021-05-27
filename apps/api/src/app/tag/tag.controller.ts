import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';

import { TagService } from './tag.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Tag } from 'libs/api-interfaces/src';
import Log from '../Log';

@Controller('tag')
export class TagController {
  constructor(private readonly service: TagService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req): Promise<Tag[]> {
    const username = req.user.username;
    const start = new Date().getTime();
    const result = await this.service.getAllTags(username);
    const end = new Date().getTime();
    Log.log(TagController.name, this.getAll, start, end, {
      username,
      result,
    });
    return result;
  }
}
