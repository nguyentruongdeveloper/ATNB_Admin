import { Component, OnInit } from '@angular/core';
import { Author } from '../../model/author';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthorService } from '../../service/author.service';

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
  public editDataItem: Author
  public isNew: boolean;
  public gridView: GridDataResult;
  public pageSize = 15;
  public skip = 0;
  private arrCategory: Author[];
  public totalRecord: number = 0;
  public searchname: string = "0";
  constructor(public authorService: AuthorService) { }

  ngOnInit() {
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
  }
  public valueChange(value: any): void {
    this.pageSize = value;
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
   
}

public selectionChange(value: any): void {
  this.pageSize = value;
  this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
}

public enterSearch(frmSearch:NgForm)
{
  this.searchname = frmSearch.value.txtSearch;
  
  if (this.searchname.length < 1) {
    this.searchname = "0";

  }
 this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
}
public blurSearch(frmSearch:NgForm)
{
  this.searchname = frmSearch.value.txtSearch;
  
  if (this.searchname.length < 1) {
    this.searchname = "0";

  }
 this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);

}
public onSubmit(frmSearch:NgForm) {
  this.searchname = frmSearch.value.txtSearch;
  
   if (this.searchname.length < 1) {
     this.searchname = "0";

   }
  this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);

}

  public addHandler() {
    this.editDataItem = new Author()
    this.isNew = true;
  }
  
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
  }
  public loadData(seachname: string, skip: number, pagesize: number) {
    this.authorService.getAuthor(seachname, skip, pagesize).subscribe(
      (data) => {

        this.arrCategory = data["data"] as Author[];
        this.totalRecord = data["total"] as number;
        

        this.gridView = {
          data: this.arrCategory,
          total: this.totalRecord
        }
      }
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

    this.authorService.SaveAuthor(entity, this.isNew).subscribe(data => { this.loadData(this.searchname, this.skip, this.pageSize); });


    this.editDataItem = undefined;
  }

  public removeHandler({ dataItem }) {


    let objAuthor: Author = dataItem as Author;
    this.authorService.deleteAuthor(objAuthor)
      .subscribe((data) => { this.loadData(this.searchname, this.skip, this.pageSize) });


  }

}
