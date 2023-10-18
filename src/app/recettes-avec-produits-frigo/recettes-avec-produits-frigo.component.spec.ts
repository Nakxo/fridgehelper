import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecettesAvecProduitsFrigoComponent } from './recettes-avec-produits-frigo.component';

describe('RecettesAvecProduitsFrigoComponent', () => {
  let component: RecettesAvecProduitsFrigoComponent;
  let fixture: ComponentFixture<RecettesAvecProduitsFrigoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecettesAvecProduitsFrigoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecettesAvecProduitsFrigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
