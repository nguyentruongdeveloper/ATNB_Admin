import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../../model/product';
import { FileInfo, FileRestrictions } from '@progress/kendo-angular-upload';
import { Author } from '../../model/author';

@Component({
  selector: 'edit-author',
  templateUrl: './edit-author.component.html',
  styles: [
    'input[type=text] { width: 100%; }',
    'textarea[kendoTextArea]{width: 100%;}'
  ],
})
export class EditAuthorComponent  {

  public active = false;
  public editForm: FormGroup = new FormGroup({
      'AuthorID': new FormControl(),
      'AuthorName': new FormControl('', Validators.required),
      'History': new FormControl()
      
  });

  @Input() public isNew = false;

  @Input() public set model(author:Author) {
      this.editForm.reset(author);

      this.active =author !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<Author> = new EventEmitter();

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
