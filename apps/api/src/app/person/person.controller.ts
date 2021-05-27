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
import { PersonDto } from './types/person.dto';
import Log from '../Log';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DeletionReportDto } from './types/deletion-report.dto';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly service: PersonService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Get All Persons',
    description:
      'Gets all Persons in the Database, that are associated with the logged in user. Requires a valid JWT Token.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'All Persons that belong to the logged in user',
    type: [PersonDto],
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
  @ApiOperation({
    summary: 'Get Person by ID',
    description:
      'Gets a specific Person in the Database, that is associated with the logged in user. Requires a valid JWT Token.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description:
      'The Person with the corresponding id, if it belongs to the logged in user',
    type: PersonDto,
  })
  @ApiParam({ name: 'id', description: 'The id of the Person' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
  @ApiOperation({
    summary: 'Create Person',
    description:
      'Creates a person in the Database, that is associated with the logged in user. Requires a valid JWT Token.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description: 'The created Person',
    type: PersonDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
  @ApiOperation({
    summary: 'Update Person',
    description:
      'Updates a Person in the Database, if it is associated with the logged in user. Requires a valid JWT Token.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description:
      'The updated Person with the corresponding id, if it belongs to the logged in user',
    type: PersonDto,
  })
  @ApiParam({ name: 'id', description: 'The id of the Person to update' })
  @ApiBody({
    description: 'The Person details for the update',
    type: PersonDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
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
  @ApiOperation({
    summary: 'Delete Person',
    description:
      'Deletes a Person from the Database, if it is associated with the logged in user. Requires a valid JWT Token.',
  })
  @ApiCookieAuth()
  @ApiOkResponse({
    description:
      'The deletion report of the Person with the corresponding id, if it belongs to the logged in user',
    type: DeletionReportDto,
  })
  @ApiParam({ name: 'id', description: 'The id of the Person to delete' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @Delete(':id')
  async delete(
    @Param('id') id: PersonDto,
    @Request() req
  ): Promise<DeletionReportDto> {
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
