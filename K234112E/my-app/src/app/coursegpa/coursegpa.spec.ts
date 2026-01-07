import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGpaComponent } from './coursegpa';

describe('CourseGpaComponent', () => {
  let component: CourseGpaComponent;
  let fixture: ComponentFixture<CourseGpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseGpaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseGpaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
