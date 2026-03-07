import { TestBed } from '@angular/core/testing';

import { ClientFashionService } from './client-fashion-service';

describe('ClientFashionService', () => {
  let service: ClientFashionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientFashionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
