import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShareService } from './shareservice';
import { Config } from './config';
import { Category } from '../model/category';

@Injectable()
export class CategoryService {
  public URI:string ="category";

  constructor(private _shareService:ShareService ) { }
  public getCategory(searchname:string ,skip:number, pagesize:number):Observable<any[]>
  {
   
      return this._shareService.httpGet(Config.URL+this.URI+"/"+searchname+"/"+skip+"/"+pagesize);
  }
  public getAllCategory():Observable<any[]>
  {
   
      return this._shareService.httpGet(Config.URL+this.URI+"/getall");
  }
  public getTotalRecord(skip:number, pagesize:number):Observable<any[]>
  {
   
      return this._shareService.httpGet(Config.URL+this.URI+"/gettotalrecord");
  }
  public SaveCategory(entity:Category,isNew:boolean):Observable<any>
  {
    if(isNew)
    {
      return  this._shareService.httpPost<Category>(Config.URL+ this.URI,entity);
     

    }
    else
    {
      return  this._shareService.httpPut<Category>(Config.URL+ this.URI,entity);
    }
      
  }
  
  deleteCategory<Category>(objectCategory:Category): Observable < any > {  
   return  this._shareService.httpDelete(Config.URL+ this.URI,objectCategory);
  }

}
