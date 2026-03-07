import { TestBed } from '@angular/core/testing';

import { AdminFashionService } from './admin-fashion-service';

describe('AdminFashionService', () => {
  let service: AdminFashionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFashionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
