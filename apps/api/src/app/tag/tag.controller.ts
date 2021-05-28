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
import Log from '../Log';
import {
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TagDto } from './types/tag.dto';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly service: TagService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get All Tags',
    description:
      'Gets all Tags assigned to Persons in the Database, that are associated with the logged in user. Requires a valid JWT Token.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'All Tags of Persons that belong to the logged in user',
    type: [TagDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Get()
  async getAll(@Request() req): Promise<TagDto[]> {
    const username = req.user.username;
    const start = new Date().getTime();
    const result = await this.service.getAllTags(username);
    const end = new Date().getTime();
    Log.log(TagController.name, this.getAll, start, end, {
      username,
    });
    return result;
  }
}
