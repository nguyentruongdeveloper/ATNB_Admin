import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCategoryBookComponent } from './edit-category-book.component';

describe('EditCategoryBookComponent', () => {
  let component: EditCategoryBookComponent;
  let fixture: ComponentFixture<EditCategoryBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCategoryBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
