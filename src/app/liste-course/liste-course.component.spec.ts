import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeCourseComponent } from './liste-course.component';

describe('ListeCourseComponent', () => {
  let component: ListeCourseComponent;
  let fixture: ComponentFixture<ListeCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
