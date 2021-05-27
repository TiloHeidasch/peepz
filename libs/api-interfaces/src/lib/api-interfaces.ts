export interface Person {
  id?: string;
  characteristicGroup1: Characteristic;
  characteristicGroup2: Characteristic;
  characteristicGroup3: Characteristic;
  characteristicGroup4: Characteristic;
  tags: Tag[];
  name?: string;
  birthday?: string;
  picture?: string;
  lastContact?: string;
  freeText?: string;
}
export interface Tag {
  name: string;
}
export interface Characteristic {
  id: string;
  characteristics: Characteristic[];
  name: string;
}
export interface User {
  username: string;
  password?: string;
  jwtToken?: string;
  jwtRefreshToken?: string;
}
export interface DeletionReport {
  ok?: number;
  n?: number;
  deletedCount?: number;
}
export interface Register {
  username: string;
  password: string;
  captcha: string;
}
