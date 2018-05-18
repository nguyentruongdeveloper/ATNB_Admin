import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategoryBookComponent } from './list-category-book.component';

describe('ListCategoryBookComponent', () => {
  let component: ListCategoryBookComponent;
  let fixture: ComponentFixture<ListCategoryBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategoryBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategoryBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
