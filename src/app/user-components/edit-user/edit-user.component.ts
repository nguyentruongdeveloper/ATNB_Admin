import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../../model/product';
import { FileInfo, FileRestrictions } from '@progress/kendo-angular-upload';
import { User } from '../../model/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styles: [
    'input[type=text] { width: 100%; }',
    'textarea[kendoTextArea]{width: 100%;}'
  ],
})
export class EditUserComponent  {

  public active = false;
  public editForm: FormGroup = new FormGroup({
      'UserID': new FormControl(),
      'UserName': new FormControl('', Validators.required),
      'Password': new FormControl(),
      'Email': new FormControl()
      
  });

  @Input() public isNew = false;

  @Input() public set model(user:User) {
      this.editForm.reset(user);

      this.active =user !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<User> = new EventEmitter();

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

  

}
