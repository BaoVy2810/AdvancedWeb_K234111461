import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listcustomerservicer } from './listcustomerservicer';

describe('Listcustomerservicer', () => {
  let component: Listcustomerservicer;
  let fixture: ComponentFixture<Listcustomerservicer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listcustomerservicer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listcustomerservicer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
