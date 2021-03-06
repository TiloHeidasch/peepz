import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Person, Tag } from '@peepz/api-interfaces';
import { CryptoService } from '../crypto.service';
import { PersonService } from './person.service';

@Component({
  selector: 'peepz-peepz',
  templateUrl: './peepz.component.html',
  styleUrls: ['./peepz.component.scss'],
})
export class PeepzComponent implements OnInit {
  people: Person[] = [];
  filteredPeople: Person[] = [];
  searchFormControl = new FormControl();
  constructor(
    private service: PersonService,
    private _snackBar: MatSnackBar,
    private router: Router,
    public cryptoService: CryptoService
  ) {
    this.searchFormControl.setValue('');
    this.searchFormControl.valueChanges.subscribe(
      (search) => {
        this.filter();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  filter() {
    const search = this.searchFormControl.value;
    this.filteredPeople = this.people
      .filter(
        (person) =>
          this.doesNameContainSearch(person.name, search) ||
          this.doTagsContainSearch(person.tags, search)
      )
      .sort((p1, p2) => {
        const p1name  =  this.cryptoService.decrypt(p1.name);;
        const p2name  =  this.cryptoService.decrypt(p2.name);;
        if (p1name > p2name) {
          return 1;
        }
        if (p1name < p2name) {
          return -1;
        }
        return 0;
      });
  }
  doesNameContainSearch(name: string, search: string): boolean {
    return (
      (name &&
        this.cryptoService
          .decrypt(name)
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      !name ||
      name === ''
    );
  }

  doTagsContainSearch(tags: Tag[], search): boolean {
    let result = false;
    tags.forEach((tag) => {
      if (
        this.cryptoService
          .decrypt(tag.name)
          .toLowerCase()
          .includes(search.toLowerCase())
      ) {
        result = true;
      }
    });
    return result;
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(
      (success) => {
        this.people = success;
        this.filter();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  addPerson() {
    this.service.create().subscribe(
      (success) => {
        this.router.navigate(['/peepz/' + success.id]);
      },
      (error) => {
        console.error(error);
        this._snackBar.open(`Error - ${error.message}`, 'Retry', {
          duration: 3000,
        });
      }
    );
  }
}
