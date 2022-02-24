import { TestBed } from '@angular/core/testing';

import { WrittenAttemptService } from './written-attempt.service';

describe('WrittenAttemptService', () => {
  let service: WrittenAttemptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WrittenAttemptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
