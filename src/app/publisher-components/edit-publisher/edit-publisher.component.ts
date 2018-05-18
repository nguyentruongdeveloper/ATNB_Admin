import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../../model/product';
import { FileInfo, FileRestrictions } from '@progress/kendo-angular-upload';
import { Author } from '../../model/author';
import { Publisher } from '../../model/publisher';

@Component({
  selector: 'edit-publisher',
  templateUrl: './edit-publisher.component.html',
  styles: [
    'input[type=text] { width: 100%; }',
    'textarea[kendoTextArea]{width: 100%;}'
  ],
})
export class EditPublisherComponent  {

    public active = false;
    public editForm: FormGroup = new FormGroup({
        'PublisherID': new FormControl(),
        'PublisherName': new FormControl('', Validators.required),
        'Description': new FormControl()
        
    });
  
    @Input() public isNew = false;
  
    @Input() public set model(publisher:Publisher) {
        this.editForm.reset(publisher);
  
        this.active = publisher !== undefined;
    }
  
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Publisher> = new EventEmitter();
  
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
