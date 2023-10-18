import { TestBed } from '@angular/core/testing';

import { ListeRecettesService } from './liste-recettes.service';

describe('ListeRecettesService', () => {
  let service: ListeRecettesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListeRecettesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
