import { ApiProperty } from '@nestjs/swagger';
import { Person as PersonInterface, Tag } from 'libs/api-interfaces/src';
import { CharacteristicDto } from './characteristic.dto';
import { Person } from './person.schema';

export class PersonDto implements PersonInterface {
  @ApiProperty({ example: '60afeb9d7f9e59281e1241d6' })
  id: string;
  @ApiProperty({ required: false, example: new Date() })
  birthday?: string;
  @ApiProperty({
    required: false,
    example:
      ' data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/4QBCRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAkAAAAMAAAABAAAAAEABAAEAAAABAQAAAAAAAAAAAP...',
  })
  picture?: string;
  @ApiProperty({ required: false, example: new Date() })
  lastContact?: string;
  @ApiProperty()
  characteristicGroup1: CharacteristicDto;
  @ApiProperty()
  characteristicGroup2: CharacteristicDto;
  @ApiProperty()
  characteristicGroup3: CharacteristicDto;
  @ApiProperty()
  characteristicGroup4: CharacteristicDto;
  @ApiProperty()
  tags: Tag[];
  @ApiProperty({ example: 'Donald Obama', required: false })
  name?: string;
  @ApiProperty({
    example: '<p>This is some <strong>rich</strong> text</p>',
    required: false,
  })
  freeText?: string;
  constructor(person?: Person) {
    if (person) {
      this.id = person._id;
      this.birthday = person.birthday;
      this.picture = person.picture;
      this.lastContact = person.lastContact;
      this.characteristicGroup1 = person.characteristicGroup1;
      this.characteristicGroup2 = person.characteristicGroup2;
      this.characteristicGroup3 = person.characteristicGroup3;
      this.characteristicGroup4 = person.characteristicGroup4;
      this.tags = person.tags;
      this.name = person.name;
      this.freeText = person.freeText;
    }
  }
}
