import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonListEntryComponent } from './person-list-entry.component';

describe('PersonListEntryComponent', () => {
  let component: PersonListEntryComponent;
  let fixture: ComponentFixture<PersonListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonListEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
