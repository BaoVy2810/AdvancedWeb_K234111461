import { TestBed } from '@angular/core/testing';

import { Ex63Product } from './ex63-product';

describe('Ex63Product', () => {
  let service: Ex63Product;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ex63Product);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
