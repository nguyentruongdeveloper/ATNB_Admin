
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Category } from '../../model/category';

@Component({
  selector: 'edit-category-book',
  styles: [
    'input[type=text] { width: 100%; }',
    'textarea[kendoTextArea]{width: 100%;}'
  ],
  templateUrl: './edit-category-book.component.html',
 
})
export class EditCategoryBookComponent  {
  public active = false;
  public editForm: FormGroup = new FormGroup({
      'CategoryID': new FormControl(),
      'CategoryName': new FormControl('', Validators.required),
      'Description': new FormControl()
      
  });

  @Input() public isNew = false;

  @Input() public set model(category:Category) {
      this.editForm.reset(category);

      this.active = category !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<Category> = new EventEmitter();

  public onSave(e): void {
      e.preventDefault();
      this.save.emit(this.editForm.value);
      this.active = false;
  }

  public onCancel(e): void {
      e.preventDefault();
      this.closeForm();
  }

  private closeForm(): void {
      this.active = false;
      this.cancel.emit();
  }

  constructor() { }

  ngOnInit() {
  }

}
