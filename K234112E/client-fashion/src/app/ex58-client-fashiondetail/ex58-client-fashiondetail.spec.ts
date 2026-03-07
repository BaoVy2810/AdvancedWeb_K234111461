import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex58ClientFashiondetail } from './ex58-client-fashiondetail';

describe('Ex58ClientFashiondetail', () => {
  let component: Ex58ClientFashiondetail;
  let fixture: ComponentFixture<Ex58ClientFashiondetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex58ClientFashiondetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex58ClientFashiondetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
