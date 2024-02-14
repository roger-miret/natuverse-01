import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isTaxonomiaGuard } from './is-taxonomia.guard';

describe('isTaxonomiaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isTaxonomiaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
