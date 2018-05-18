import { TestBed, inject } from '@angular/core/testing';

import { ShareDataUserService } from './share-data-user.service';

describe('ShareDataUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShareDataUserService]
    });
  });

  it('should be created', inject([ShareDataUserService], (service: ShareDataUserService) => {
    expect(service).toBeTruthy();
  }));
});
