import { TestBed, inject } from '@angular/core/testing';

import { CognitoAuthService } from './cognito-auth.service';

describe('CognitoAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CognitoAuthService]
    });
  });

  it('should be created', inject([CognitoAuthService], (service: CognitoAuthService) => {
    expect(service).toBeTruthy();
  }));
});
