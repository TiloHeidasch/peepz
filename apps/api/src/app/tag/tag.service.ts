import { Injectable } from '@nestjs/common';
import { Tag, Person } from '@peepz/api-interfaces';
import { PersonService } from '../person/person.service';

@Injectable()
export class TagService {
  constructor(private personService: PersonService) {}
  async getAllTags(user: string): Promise<Tag[]> {
    const allPersons: Person[] = await this.personService.getAll(user);
    const tags: Tag[] = [];
    allPersons.forEach((person) => {
      tags.push(...person.tags);
    });
    return tags;
  }
}
