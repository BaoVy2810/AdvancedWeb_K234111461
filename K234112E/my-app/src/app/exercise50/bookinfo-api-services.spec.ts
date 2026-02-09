import { TestBed } from '@angular/core/testing';

import { BookinfoApiServices } from './bookinfo-api-services';

describe('BookinfoApiServices', () => {
  let service: BookinfoApiServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookinfoApiServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
