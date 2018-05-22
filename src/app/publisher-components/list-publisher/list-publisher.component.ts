import { Component, OnInit } from '@angular/core';
import { Publisher } from '../../model/publisher';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { PublisherService } from '../../service/publisher.service';
import { ShareDataUserService } from '../../service/share-data-user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-publisher',
  templateUrl: './list-publisher.component.html',
  styleUrls: ['./list-publisher.component.scss']
})
export class ListPublisherComponent implements OnInit {
  public listItems: Array<string> = [
    '10', '15', '20', '25',
    '30'
  ];

  public editDataItem: Publisher;
  public isNew: boolean;
  public gridView: GridDataResult;
  public pageSize = 15;
  public skip = 0;
  private arrCategory: Publisher[];
  public totalRecord: number = 0;
  public searchname: string = "0";
  public loading: boolean = false;




  constructor(private publisherService: PublisherService,
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
  //Search 
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

  //Page Change

  public valueChange(value: any): void {
    this.pageSize = value;
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);

  }

  public selectionChange(value: any): void {
    this.pageSize = value;
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
  }


  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;




    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
  }
  //Load data
  public loadData(seachname: string, skip: number, pagesize: number) {
    this.loading = true;
    this.publisherService.getPublisher(seachname, skip, pagesize).subscribe(
      (data) => {

        this.arrCategory = data["data"] as Publisher[];
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
    this.editDataItem = new Publisher();
    this.isNew = true;
  }
  public editHandler({ dataItem }) {
    this.editDataItem = dataItem;
    this.isNew = false;
  }
  public cancelHandler() {
    this.editDataItem = undefined;
  }

  public saveHandler(entity: Publisher) {

    this.publisherService.SavePublisher(entity, this.isNew).subscribe(
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


    let objPublisher: Publisher = dataItem as Publisher;
    this.publisherService.deletePublisher(objPublisher)
      .subscribe((data) => { this.loadData(this.searchname, this.skip, this.pageSize) });


  }
}
