import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationRecetteComponent } from './creation-recette.component';

describe('CreationRecetteComponent', () => {
  let component: CreationRecetteComponent;
  let fixture: ComponentFixture<CreationRecetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationRecetteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
