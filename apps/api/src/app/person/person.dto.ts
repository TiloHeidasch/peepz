import {
  Characteristic,
  Person as PersonInterface,
  Tag,
} from 'libs/api-interfaces/src';
import { Person } from './person.schema';

export class PersonDto implements PersonInterface {
  id: string;
  birthday?: string;
  picture?: string;
  lastContact?: string;
  characteristicGroup1: Characteristic;
  characteristicGroup2: Characteristic;
  characteristicGroup3: Characteristic;
  characteristicGroup4: Characteristic;
  tags: Tag[];
  name?: string;
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
