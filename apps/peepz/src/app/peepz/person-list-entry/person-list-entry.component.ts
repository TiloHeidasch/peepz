import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person, Tag } from 'libs/api-interfaces/src';
import { CryptoService } from '../../crypto.service';

@Component({
  selector: 'peepz-person-list-entry',
  templateUrl: './person-list-entry.component.html',
  styleUrls: ['./person-list-entry.component.scss'],
})
export class PersonListEntryComponent implements OnInit {
  @Input() person: Person;
  imageSrc = '';
  constructor(private router: Router, public cryptoService: CryptoService) {}

  ngOnInit(): void {}
  click() {
    this.router.navigate(['/peepz/' + this.person.id]);
  }

  getTagClass(tag: Tag): string {
    return `tag-color${
      (this.cryptoService
        .decrypt(tag.name)
        .replace('a', ' ')
        .replace('e', '  ')
        .replace('i', '   ')
        .replace('o', '    ')
        .replace('u', '     ').length -
        1) %
      20
    }`;
  }
}
