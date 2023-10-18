import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecetteDetailsComponent } from './recette-details.component';

describe('RecetteDetailsComponent', () => {
  let component: RecetteDetailsComponent;
  let fixture: ComponentFixture<RecetteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecetteDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecetteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
