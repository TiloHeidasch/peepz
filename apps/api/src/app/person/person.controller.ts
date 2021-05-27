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

import { PersonService } from './person.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PersonDto } from './person.dto';
import { DeletionReport, Tag } from 'libs/api-interfaces/src';
import Log from '../Log';

@Controller('person')
export class PersonController {
  constructor(private readonly service: PersonService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req): Promise<PersonDto[]> {
    const username = req.user.username;
    const start = new Date().getTime();
    const result = (await this.service.getAll(username)).map(
      (res) => new PersonDto(res)
    );
    const end = new Date().getTime();
    Log.log(PersonController.name, this.getAll, start, end, {
      username,
    });
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id, @Request() req): Promise<PersonDto> {
    const username = req.user.username;
    const start = new Date().getTime();
    const result = new PersonDto(await this.service.getById(id, username));
    const end = new Date().getTime();
    Log.log(PersonController.name, this.getById, start, end, {
      username,
      id,
    });
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req): Promise<PersonDto> {
    const username = req.user.username;
    const start = new Date().getTime();
    const result = new PersonDto(await this.service.create(username));
    const end = new Date().getTime();
    Log.log(PersonController.name, this.create, start, end, {
      username,
      result,
    });
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() person: PersonDto,
    @Request() req
  ): Promise<PersonDto> {
    const username = req.user.username;
    const start = new Date().getTime();
    const result = new PersonDto(
      await this.service.update(id, person, username)
    );
    const end = new Date().getTime();
    Log.log(PersonController.name, this.update, start, end, {
      username,
    });
    return result;
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: PersonDto,
    @Request() req
  ): Promise<DeletionReport> {
    const username = req.user.username;
    const start = new Date().getTime();
    const result = await this.service.delete(id, username);
    const end = new Date().getTime();
    Log.log(PersonController.name, this.update, start, end, {
      username,
      result,
    });
    return result;
  }
}
