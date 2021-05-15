import { TestBed } from "@angular/core/testing";

import { StudentsLocalService } from "./students-local.service";

describe("StudentsLocalService", () => {
  let service: StudentsLocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsLocalService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
