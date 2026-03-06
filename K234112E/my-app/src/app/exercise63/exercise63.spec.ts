import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise63 } from './exercise63';

describe('Exercise63', () => {
  let component: Exercise63;
  let fixture: ComponentFixture<Exercise63>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Exercise63]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise63);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
