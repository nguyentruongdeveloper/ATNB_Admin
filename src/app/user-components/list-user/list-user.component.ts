import { Component, OnInit } from '@angular/core';

import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import{User} from '../../../app/model//user';
import{ShareDataUserService}from '../../service//share-data-user.service';
import{UserService} from '../../service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  public listItems: Array<string> = [
    '10', '15', '20', '25',
    '30'
  ];
  public editDataItem:User
  public isNew: boolean;
  public gridView: GridDataResult;
  public pageSize = 10;
  public skip = 0;
  private arrUser:User[];
  public totalRecord: number = 0;
  public searchname: string = "0";
  public loading:boolean=false;
  constructor(public _userService: UserService,
    private _shareDataUserService:   ShareDataUserService,
    private _urlRouter :Router
     )
      { 

      }

  ngOnInit() {
    //check Login
    // if(this._shareDataUserService.User==null)
    // {
    //   this._urlRouter.navigate(['/login']);
    // }
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
    this.editDataItem = new User()
    this.isNew = true;
  }
  
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadData(this.searchname, this.skip / this.pageSize, this.pageSize);
  }
  public loadData(seachname: string, skip: number, pagesize: number) {
    this.loading=true;
    this._userService.getUser(seachname, skip, pagesize).subscribe(
      (data) => {

        this.arrUser = data["data"] as User[];
        this.totalRecord = data["total"] as number;
        

        this.gridView = {
          data: this.arrUser,
          total: this.totalRecord
        }
        this.loading=false;
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

  public saveHandler(entity:User) {

    this._userService.SaveUser(entity, this.isNew).subscribe(data => { this.loadData(this.searchname, this.skip, this.pageSize); });


    this.editDataItem = undefined;
  }

  public removeHandler({ dataItem }) {


    let objUser: User = dataItem as User;
    this._userService.deleteUser(objUser)
      .subscribe((data) => { this.loadData(this.searchname, this.skip, this.pageSize) });


  }

}
