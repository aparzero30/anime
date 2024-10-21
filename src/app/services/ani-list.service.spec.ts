import { TestBed } from '@angular/core/testing';

import { AniListService } from './ani-list.service';

describe('AniListService', () => {
  let service: AniListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AniListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
