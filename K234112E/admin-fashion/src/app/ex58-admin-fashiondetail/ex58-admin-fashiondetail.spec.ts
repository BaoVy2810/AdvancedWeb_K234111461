import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex58AdminFashiondetail } from './ex58-admin-fashiondetail';

describe('Ex58AdminFashiondetail', () => {
  let component: Ex58AdminFashiondetail;
  let fixture: ComponentFixture<Ex58AdminFashiondetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex58AdminFashiondetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex58AdminFashiondetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
