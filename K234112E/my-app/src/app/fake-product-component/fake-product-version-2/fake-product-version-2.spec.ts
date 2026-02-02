import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeProductVersion2 } from './fake-product-version-2';

describe('FakeProductVersion2', () => {
  let component: FakeProductVersion2;
  let fixture: ComponentFixture<FakeProductVersion2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FakeProductVersion2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FakeProductVersion2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
