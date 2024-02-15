import { TestBed } from '@angular/core/testing';

import { AccountRecoveryService } from './account-recovery.service';

describe('AccountRecoveryService', () => {
  let service: AccountRecoveryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountRecoveryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
