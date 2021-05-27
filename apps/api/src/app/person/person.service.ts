import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { PersonDto } from './person.dto';
import { Characteristic, Person } from './person.schema';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name)
    private db: Model<Person>,
    private userService: UserService
  ) {}
  async getAll(user: string): Promise<Person[]> {
    const userId = (await this.userService.getByUsername(user))._id;
    return await this.db.find({ owner: userId }).exec();
  }
  async getById(id: string, user: string): Promise<Person> {
    const userId = (await this.userService.getByUsername(user))._id;
    return await this.db.findOne({ _id: id, owner: userId }).exec();
  }
  async create(user: string): Promise<Person> {
    const userId = (await this.userService.getByUsername(user))._id;
    const characteristicGroup1: Characteristic = {
      id: 'root',
      name: '',
      characteristics: [],
    };
    const characteristicGroup2: Characteristic = {
      id: 'root',
      name: '',
      characteristics: [],
    };
    const characteristicGroup3: Characteristic = {
      id: 'root',
      name: '',
      characteristics: [],
    };
    const characteristicGroup4: Characteristic = {
      id: 'root',
      name: '',
      characteristics: [],
    };
    return await this.db.create({
      owner: userId,
      tags: [],
      characteristicGroup1,
      characteristicGroup2,
      characteristicGroup3,
      characteristicGroup4,
    });
  }
  async update(id, person: PersonDto, user: string): Promise<Person> {
    const userId = (await this.userService.getByUsername(user))._id;
    await this.db.updateOne({ _id: id, owner: userId }, person).exec();
    return await this.getById(id, user);
  }
  async delete(id, user: string) {
    const userId = (await this.userService.getByUsername(user))._id;
    return await this.db.deleteOne({ _id: id, owner: userId }).exec();
  }
}
