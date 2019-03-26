import { TestBed } from '@angular/core/testing';

import { KnwlGroupService } from './knwl-group.service';

describe('KnwlGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KnwlGroupService = TestBed.get(KnwlGroupService);
    expect(service).toBeTruthy();
  });
});
