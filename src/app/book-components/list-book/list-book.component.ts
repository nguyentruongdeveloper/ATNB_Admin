import { Component, OnInit, Inject } from '@angular/core';
import { products } from '../../model/products';
import { Product } from '../../model/product';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Observable } from 'rxjs/Observable';
import { EditService } from '../../service/edit.service';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpProgressEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { concat } from 'rxjs/observable/concat';
import { delay } from 'rxjs/operators/delay';
import { BookService } from '../../service/book.service';
import { Book } from '../../model/book';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { SharedataService } from '../../service/sharedata.service';


@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.scss']
})
export class ListBookComponent implements OnInit {
  public listItems: Array<string> = [
    '10', '15', '20', '25',
    '30'
  ];
  public editDataItem: Book
  public isNew: boolean;
  public gridView: GridDataResult;
  public pageSize = 15;
  public skip = 0;
  private arrBook: Book[];
  public totalRecord: number = 0;
  public searchname: string = "0";


  constructor(public bookService: BookService,
              public _router :Router, public _shareDataService: SharedataService     ) {

  }

  public ngOnInit(): void {
    this.loadData(this.searchname,0,this.pageSize);

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
  
  
  public loadData(seachname: string, skip: number, pagesize: number) {
    this.bookService.getBook(seachname, skip, pagesize).subscribe(
      (data) => {

        this.arrBook = data["data"] as any[];
        this.totalRecord = data["total"] as number;


        this.gridView = {
          data: this.arrBook,
          total: this.totalRecord
        }
      }
    )
  }
 
 
  public editHandler({ dataItem }) {
    this.editDataItem = dataItem;
    this.isNew = false;
    this._shareDataService.ShareData={
      IsNew: this.isNew,
      Book:this.editDataItem,
      Title:'Edit Book'

    };
   
    this._router.navigate(['/edit-book'],)
   
  }
  public addHandler()
  {
    
    this.editDataItem = new Book();
    this.isNew = true;
    this._shareDataService.ShareData={
      IsNew: this.isNew,
      Book:this.editDataItem,
      Title:'Add Book'

    };
   
    this._router.navigate(['/edit-book'],)

  }
  public removeHandler({ dataItem }) {


    let objBook: Book = dataItem as Book;
    this.bookService.deleteBook(objBook)
      .subscribe((data) => { this.loadData(this.searchname, this.skip, this.pageSize) });


  }
  
  
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (req.url === 'saveUrl') {
  //     const events: Observable<HttpEvent<any>>[] = [0, 30, 60, 100].map((x) => of(<HttpProgressEvent>{
  //       type: HttpEventType.UploadProgress,
  //       loaded: x,
  //       total: 100
  //     }).pipe(delay(1000)));

  //     const success = of(new HttpResponse({ status: 200 })).pipe(delay(1000));
  //     events.push(success);

  //     return concat(...events);
  //   }

  //   if (req.url === 'removeUrl') {
  //     return of(new HttpResponse({ status: 200 }));
  //   }

  //   return next.handle(req);
  // }



}
