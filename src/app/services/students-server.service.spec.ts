import { TestBed } from '@angular/core/testing';

import { StudentsServerService } from './students-server.service';

describe('StudentsServerService', () => {
  let service: StudentsServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
