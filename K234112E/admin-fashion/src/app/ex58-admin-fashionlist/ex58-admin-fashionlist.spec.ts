import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex58AdminFashionlist } from './ex58-admin-fashionlist';

describe('Ex58AdminFashionlist', () => {
  let component: Ex58AdminFashionlist;
  let fixture: ComponentFixture<Ex58AdminFashionlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex58AdminFashionlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex58AdminFashionlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
