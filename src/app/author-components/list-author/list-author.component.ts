import { Component, OnInit } from '@angular/core';
import { Author } from '../../model/author';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthorService } from '../../service/author.service';
import { ShareDataUserService } from '../../service/share-data-user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-author',
  templateUrl: './list-author.component.html',
  styleUrls: ['./list-author.component.scss']
})
export class ListAuthorComponent implements OnInit {
  public listItems: Array<string> = [
    '10', '15', '20', '25',
    '30'
  ];
  private editDataItem: Author
  private isNew: boolean;
  private gridView: GridDataResult;
  private pageSize = 15;
  private skip = 0;
  private arrCategory: Author[];
  private totalRecord: number = 0;
  private searchName: string = "0";
  private loading:boolean=false;
  constructor(public authorService: AuthorService,
    private _shareDataUserService:   ShareDataUserService,
    private _urlRouter :Router,
    private toastr: ToastrService
     ){}
      
  ngOnInit() {
    
    if(this._shareDataUserService.User==null)
    {
      this._urlRouter.navigate(['/login']);
    }
    this.loadData(this.searchName, this.skip / this.pageSize, this.pageSize);
  }
  public valueChange(value: any): void {
    this.pageSize = value;
    this.loadData(this.searchName, this.skip / this.pageSize, this.pageSize);
   
}

public selectionChange(value: any): void {
  this.pageSize = value;
  this.loadData(this.searchName, this.skip / this.pageSize, this.pageSize);
}

public enterSearch(frmSearch:NgForm)
{
  this.searchName = frmSearch.value.txtSearch;
  
  if (this.searchName.length < 1) {
    this.searchName = "0";

  }
 this.loadData(this.searchName, this.skip / this.pageSize, this.pageSize);
}
public blurSearch(frmSearch:NgForm)
{
  this.searchName = frmSearch.value.txtSearch;
  
  if (this.searchName.length < 1) {
    this.searchName = "0";

  }
 this.loadData(this.searchName, this.skip / this.pageSize, this.pageSize);

}
public onSubmit(frmSearch:NgForm) {
  this.searchName = frmSearch.value.txtSearch;
  
   if (this.searchName.length < 1) {
     this.searchName = "0";

   }
  this.loadData(this.searchName, this.skip / this.pageSize, this.pageSize);

}

  public addHandler() {
    this.editDataItem = new Author()
    this.isNew = true;
  }
  
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadData(this.searchName, this.skip / this.pageSize, this.pageSize);
  }
  public loadData(seachname: string, skip: number, pagesize: number) {
    this.loading=true;
    this.authorService.getAuthor(seachname, skip, pagesize).subscribe(
      (data) => {

        this.arrCategory = data["data"] as Author[];
        this.totalRecord = data["total"] as number;
        

        this.gridView = {
          data: this.arrCategory,
          total: this.totalRecord
        }
        this.loading=false;
       
      },
      err=>{this.toastr.success(err)}
    )
  }

  public editHandler({ dataItem }) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }
  public cancelHandler() {
    this.editDataItem = undefined;
  }

  public saveHandler(entity: Author) {

    this.authorService.SaveAuthor(entity, this.isNew).subscribe(
      data => {
        if(this.isNew)
        {
          this.toastr.success("Add Data Success!");
           

        }
        else{
          this.toastr.success("Update Data Success!");
         
        }
        this.loadData(this.searchName, this.skip, this.pageSize); 
      },
      err=>{this.toastr.success(err)});


    this.editDataItem = undefined;
  }

  public removeHandler({ dataItem }) {


    let objAuthor: Author = dataItem as Author;
    this.authorService.deleteAuthor(objAuthor)
      .subscribe((data) => { this.loadData(this.searchName, this.skip, this.pageSize) },err=>{this.toastr.success(err)});


  }

}
