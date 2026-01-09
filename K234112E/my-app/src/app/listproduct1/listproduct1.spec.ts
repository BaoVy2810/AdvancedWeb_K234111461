import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listproduct1 } from './listproduct1';

describe('Listproduct1', () => {
  let component: Listproduct1;
  let fixture: ComponentFixture<Listproduct1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listproduct1]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listproduct1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
