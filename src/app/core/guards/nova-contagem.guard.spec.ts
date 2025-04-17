import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { novaContagemGuard } from './nova-contagem.guard';

describe('novaContagemGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => novaContagemGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
