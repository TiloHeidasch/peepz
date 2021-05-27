import { ApiProperty } from '@nestjs/swagger';
import { Tag } from '@peepz/api-interfaces';

export class TagDto implements Tag {
  @ApiProperty({ example: 'Friend' })
  name: string;
}
