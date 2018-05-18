import { TestBed, inject } from '@angular/core/testing';

import { StatusbookService } from './statusbook.service';

describe('StatusbookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatusbookService]
    });
  });

  it('should be created', inject([StatusbookService], (service: StatusbookService) => {
    expect(service).toBeTruthy();
  }));
});
