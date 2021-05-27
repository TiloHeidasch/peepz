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
      person.tags.forEach((tag) => {
        if (!this.contains(tags, tag)) {
          tags.push(tag);
        }
      });
    });
    return tags;
  }
  private contains(tags: Tag[], tag: Tag): boolean {
    let contains = false;
    tags.forEach((otherTag) => {
      if (tag.name === otherTag.name) {
        contains = true;
      }
    });
    return contains;
  }
}
