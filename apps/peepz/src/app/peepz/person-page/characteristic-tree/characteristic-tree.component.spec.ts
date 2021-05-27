import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicTreeComponent } from './characteristic-tree.component';

describe('CharacteristicTreeComponent', () => {
  let component: CharacteristicTreeComponent;
  let fixture: ComponentFixture<CharacteristicTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacteristicTreeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacteristicTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
