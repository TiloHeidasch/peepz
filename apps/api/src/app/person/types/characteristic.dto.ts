import { ApiProperty } from '@nestjs/swagger';
import { Characteristic } from 'libs/api-interfaces/src';

export class CharacteristicDto implements Characteristic {
  @ApiProperty({ example: 'd59526fd-90b7-4205-a803-6c96236569fd' })
  id: string;
  @ApiProperty({ type: [CharacteristicDto] })
  characteristics: CharacteristicDto[];
  @ApiProperty({ example: 'Family' })
  name: string;
}
