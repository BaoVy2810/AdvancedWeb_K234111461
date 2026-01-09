import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Exercise18Component } from './exercise18';

describe('Exercise18Component', () => {
  let component: Exercise18Component;
  let fixture: ComponentFixture<Exercise18Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Exercise18Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Exercise18Component);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
