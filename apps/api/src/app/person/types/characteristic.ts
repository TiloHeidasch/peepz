import { Characteristic as CharacteristicInterface } from 'libs/api-interfaces/src';

export class Characteristic implements CharacteristicInterface {
  id: string;
  characteristics: Characteristic[];
  name: string;
}
