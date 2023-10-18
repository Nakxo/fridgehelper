import { TestBed } from '@angular/core/testing';

import { ListeCourseService } from './liste-course.service';

describe('ListeCourseService', () => {
  let service: ListeCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
