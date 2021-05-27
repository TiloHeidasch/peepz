import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeepzComponent } from './peepz.component';

describe('PeepzComponent', () => {
  let component: PeepzComponent;
  let fixture: ComponentFixture<PeepzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeepzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeepzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
