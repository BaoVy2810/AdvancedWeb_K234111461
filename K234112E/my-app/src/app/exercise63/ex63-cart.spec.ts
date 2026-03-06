import { TestBed } from '@angular/core/testing';

import { Ex63Cart } from './ex63-cart';

describe('Ex63Cart', () => {
  let service: Ex63Cart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex63Cart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
