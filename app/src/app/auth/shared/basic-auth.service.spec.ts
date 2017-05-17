import { BasicAuthService } from './basic-auth.service';
import { TestBed, inject } from '@angular/core/testing';

describe('BasicAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicAuthService]
    });
  });

  it('should ...', inject([BasicAuthService], (service: BasicAuthService) => {
    expect(service).toBeTruthy();
  }));
});
