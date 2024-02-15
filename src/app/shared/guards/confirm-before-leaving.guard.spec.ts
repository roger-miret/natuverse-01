import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { confirmBeforeLeavingGuard } from './confirm-before-leaving.guard';

describe('confirmBeforeLeavingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => confirmBeforeLeavingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
