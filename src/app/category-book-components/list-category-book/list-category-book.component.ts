import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';
import { Observable } from 'rxjs/Observable';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ShareDataUserService } from '../../service/share-data-user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-category-book',
  templateUrl: './list-category-book.component.html',
  styleUrls: ['./list-category-book.component.scss']
})
export class ListCategoryBookComponent implements OnInit {
  public listItems: Array<string> = [
    '10', '15', '20', '25',
    '30'
  ];
  public editDataItem: Category;
  public isNew: boolean;
  public view: Observable<GridDataResult>;
  public gridView: GridDataResult;
  public pageSize = 15;
  public skip = 0;
  private arrCategory: Category[];
  public totalRecord: number = 0;
  public searchname: string = "0";
  public loading: boolean = false;




  constructor(private categoryService: CategoryService,
    private _shareDataUserService: ShareDataUserService,
    private _urlRouter: Router,
    private toastr: ToastrService
  ) {


  }


  ngOnInit() {

    //check Login
    if (this._shareDataUserService.User == null) {
      this._urlRouter.navigate(['/login']);
    }
    this.loadData(this.searchname, 0, this.pageSize);

  }

  public valueChange(value: any): void {
    this.pageSize = value;
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);

  }

  public selectionChange(value: any): void {
    this.pageSize = value;
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
  }
  public enterSearch(frmSearch: NgForm) {
    this.searchname = frmSearch.value.txtSearch;

    if (this.searchname.length < 1) {
      this.searchname = "0";

    }
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
  }
  public blurSearch(frmSearch: NgForm) {
    this.searchname = frmSearch.value.txtSearch;

    if (this.searchname.length < 1) {
      this.searchname = "0";

    }
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);

  }
  public onSubmit(frmSearch: NgForm) {
    this.searchname = frmSearch.value.txtSearch;

    if (this.searchname.length < 1) {
      this.searchname = "0";

    }
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);

  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;




    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
  }
  public loadData(seachname: string, skip: number, pagesize: number) {
    this.loading = true;
    this.categoryService.getCategory(seachname, skip, pagesize).subscribe(
      (data) => {

        this.arrCategory = data["data"] as Category[];
        this.totalRecord = data["total"] as number;


        this.gridView = {
          data: this.arrCategory,
          total: this.totalRecord
        }
        this.loading = false;
      },
      err=>{this.toastr.success(err)}
    )
  }
  public addHandler() {
    this.editDataItem = new Category();
    this.isNew = true;
  }
  public editHandler({ dataItem }) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }
  public cancelHandler() {
    this.editDataItem = undefined;
  }

  public saveHandler(category: Category) {

    this.categoryService.SaveCategory(category, this.isNew).subscribe(
      data => { 
        if(this.isNew)
        {
            this.toastr.success("Add Data Success!");
        }
        else
        {
          this.toastr.success("Update Data Success!");
        }
        this.loadData(this.searchname, this.skip, this.pageSize);
       },
       err=>{this.toastr.success(err)}

      );


    this.editDataItem = undefined;
  }

  public removeHandler({ dataItem }) {


    let objCategory: Category = dataItem as Category;
    this.categoryService.deleteCategory(objCategory)
      .subscribe((data) => { this.loadData(this.searchname, this.skip, this.pageSize) });


  }

}
