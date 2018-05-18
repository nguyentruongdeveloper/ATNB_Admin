import { Injectable } from '@angular/core';
import { ShareService } from './shareservice';
import { Observable } from 'rxjs/Observable';
import { Config } from './config';
import { Publisher } from '../model/publisher';

@Injectable()
export class PublisherService {

  public URI:string ="Publisher";

  constructor(private _shareService:ShareService ) { }
  public getPublisher(searchname:string ,skip:number, pagesize:number):Observable<any[]>
  {
   
      return this._shareService.httpGet(Config.URL+this.URI+"/"+searchname+"/"+skip+"/"+pagesize);
  }
  public getAllPublisher():Observable<any[]>
  {
   
      return this._shareService.httpGet(Config.URL+this.URI+"/getall");
  }
  
  public SavePublisher(entity:Publisher,isNew:boolean):Observable<any>
  {
    if(isNew)
    {
      return  this._shareService.httpPost<Publisher>(Config.URL+ this.URI,entity);
     

    }
    else
    {
      return  this._shareService.httpPut<Publisher>(Config.URL+ this.URI,entity);
    }
      
  }
  
  deletePublisher<Publisher>(entity:Publisher): Observable < any > {  
   return  this._shareService.httpDelete(Config.URL+ this.URI,entity);
  }

}
