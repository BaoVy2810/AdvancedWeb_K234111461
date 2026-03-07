import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex58ClientFashionlist } from './ex58-client-fashionlist';

describe('Ex58ClientFashionlist', () => {
  let component: Ex58ClientFashionlist;
  let fixture: ComponentFixture<Ex58ClientFashionlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Ex58ClientFashionlist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ex58ClientFashionlist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
