import { TestBed } from '@angular/core/testing';

import { ProduitCustomService } from './produit-custom.service';

describe('ProduitCustomService', () => {
  let service: ProduitCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProduitCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
