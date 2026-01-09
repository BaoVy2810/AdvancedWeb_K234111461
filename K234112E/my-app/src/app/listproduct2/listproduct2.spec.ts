import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listproduct2 } from './listproduct2';

describe('Listproduct2', () => {
  let component: Listproduct2;
  let fixture: ComponentFixture<Listproduct2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Listproduct2]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listproduct2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
