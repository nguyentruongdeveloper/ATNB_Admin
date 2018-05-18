import { Injectable, Inject, Injector } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShareService } from './shareservice';
import { Config } from './config';
import { Category } from '../model/category';
import { Author } from '../model/author';

@Injectable()
export class AuthorService {

  public URI:string ="Author";

  constructor(private _shareService:ShareService ) { }
  public getAuthor(searchname:string ,skip:number, pagesize:number):Observable<any[]>
  {
   
      return this._shareService.httpGet(Config.URL+this.URI+"/"+searchname+"/"+skip+"/"+pagesize);
  }
  public getAllAuthor():Observable<any[]>
  {
   
      return this._shareService.httpGet(Config.URL+this.URI+"/getall");
  }
  
 
  public SaveAuthor(entity:Author,isNew:boolean):Observable<any>
  {
    if(isNew)
    {
      return  this._shareService.httpPost<Author>(Config.URL+ this.URI,entity);
     

    }
    else
    {
      return  this._shareService.httpPut<Author>(Config.URL+ this.URI,entity);
    }
      
  }
  
  deleteAuthor<Author>(object:Author): Observable <any> {  
   return  this._shareService.httpDelete(Config.URL+ this.URI,object);
  }

}
