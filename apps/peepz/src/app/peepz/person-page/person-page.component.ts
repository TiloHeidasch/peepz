import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DeletePersonDialog } from './delete-person-dialog/delete-person-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Person, Tag } from '@peepz/api-interfaces';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { PersonService } from '../person.service';
import { TagService } from '../tag.service';
import { MatDialog } from '@angular/material/dialog';
import { CryptoService } from '../../crypto.service';
import { RandomuserService } from '../randomuser.service';

@Component({
  selector: 'peepz-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.scss'],
})
export class PersonPageComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('tagAutocomplete') matAutocomplete: MatAutocomplete;
  tagFormControl = new FormControl({
    disabled: this.cryptoService.isEncrypted(),
  });
  filteredTags: Observable<Tag[]>;
  allTags: Tag[] = [];
  freeTextFormControl = new FormControl();

  person: Person;
  imageSrc = 'https://www.w3schools.com/howto/img_avatar2.png';

  constructor(
    private personService: PersonService,
    private tagService: TagService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    public cryptoService: CryptoService,
    public randomuserService: RandomuserService
  ) {
    this.filteredTags = this.tagFormControl.valueChanges.pipe(
      map((tag: string | null) =>
        tag ? this._filter(tag) : this.allTags.slice()
      )
    );
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.personService.getById(id).subscribe(
      (success) => {
        this.person = success;
        this.freeTextFormControl.setValue(
          this.cryptoService.decrypt(this.person.freeText)
        );
      },
      (error) => {
        console.error(error);
        this._snackBar.open(`Error - ${error.message}`, 'Ok');
      }
    );
    this.tagService.getAll().subscribe(
      (success) => {
        this.allTags = success;
      },
      (error) => {
        console.error(error);
        this._snackBar.open(`Error - ${error.message}`, 'Ok');
      }
    );
    this.freeTextFormControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe((data) => {
        if (data !== this.person.freeText) {
          this.person.freeText = this.cryptoService.encrypt(data);
          this.persist();
        }
      });
  }
  randomize() {
    this.randomuserService.getRandomPerson().subscribe(
      (result) => {
        this.person.name = this.cryptoService.encrypt(
          `${result.results[0].name.first} ${result.results[0].name.last}`
        );
        this.person.birthday = this.cryptoService.encrypt(
          new Date(result.results[0].dob.date).toISOString()
        );
        this.person.picture = this.cryptoService.encrypt(
          result.results[0].picture.medium
        );
        this.persist();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  setName(event) {
    this.person.name = this.cryptoService.encrypt(event.target.value);
    this.persist();
  }
  setBirthday(event) {
    if (event.value) {
      this.person.birthday = this.cryptoService.encrypt(
        event.value.toISOString()
      );
    } else {
      this.person.birthday = undefined;
    }
    this.persist();
  }
  setLastContact(event) {
    if (event.value) {
      this.person.lastContact = this.cryptoService.encrypt(
        event.value.toISOString()
      );
    } else {
      this.person.lastContact = undefined;
    }
    this.persist();
  }
  setLastContactToToday() {
    this.person.lastContact = this.cryptoService.encrypt(
      new Date().toISOString()
    );
    this.persist();
  }
  addTag(event): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.person.tags.push({ name: this.cryptoService.encrypt(value) });
      this.persist();
    }

    // Clear the input value
    this.tagFormControl.setValue(null);
    this.tagInput.nativeElement.value = '';
  }

  removeTag(tag: Tag): void {
    const index = this.person.tags.indexOf(tag);
    if (index >= 0) {
      this.person.tags.splice(index, 1);
      this.persist();
    }
  }

  tagSelected(event: MatAutocompleteSelectedEvent): void {
    this.person.tags.push({
      name: this.cryptoService.encrypt(event.option.viewValue),
    });
    this.persist();
    this.tagInput.nativeElement.value = '';
    this.tagFormControl.setValue(null);
  }

  deletePerson() {
    const dialogRef = this.dialog.open(DeletePersonDialog, {
      data: this.cryptoService.decrypt(this.person.name),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.personService.delete(this.person.id).subscribe(
          (success) => {
            this._snackBar.open(
              `Deleted ${this.cryptoService.decrypt(this.person.name)}`,
              'Ok',
              {
                duration: 2000,
              }
            );
            this.router.navigate(['/']);
          },
          (error) => {
            console.error(error);
            this._snackBar.open(`Error - ${error.message}`, 'Ok');
          }
        );
      }
    });
  }

  uploadImage(imageInput) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.person.picture = this.cryptoService.encrypt(event.target.result);
      this.persist();
    });

    reader.readAsDataURL(file);
  }
  getTagClass(tag: Tag): string {
    return `tag-color${(this.cryptoService.decrypt(tag.name).length - 1) % 20}`;
  }
  private _filter(value: string): Tag[] {
    if (!value || value === '') {
      return this.allTags;
    }
    const filterValue = value.toLowerCase();

    return this.allTags.filter(
      (tag) =>
        this.cryptoService
          .decrypt(tag.name)
          .toLowerCase()
          .indexOf(filterValue) === 0
    );
  }

  private persist() {
    if (!this.cryptoService.isEncrypted()) {
      this.personService.update(this.person.id, this.person).subscribe(
        (success) => {
          console.log({ local: this.person, server: success });
          this._snackBar.open('Saved', 'Ok', { duration: 500 });
        },
        (error) => {
          console.error(error);
          this._snackBar.open(`Error - ${error.message}`, 'Ok');
        }
      );
    } else {
      this._snackBar.open('NOT Saved - Please decrypt first', 'Ok', {
        duration: 1000,
      });
    }
  }
}
