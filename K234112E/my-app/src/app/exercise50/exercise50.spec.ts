import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise50 } from './exercise50';

describe('Exercise50', () => {
  let component: Exercise50;
  let fixture: ComponentFixture<Exercise50>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Exercise50]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise50);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
