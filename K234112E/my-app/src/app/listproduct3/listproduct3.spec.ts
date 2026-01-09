import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listproduct3 } from './listproduct3';

describe('Listproduct3', () => {
  let component: Listproduct3;
  let fixture: ComponentFixture<Listproduct3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listproduct3]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listproduct3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
