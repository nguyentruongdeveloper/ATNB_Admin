import { Injectable } from '@angular/core';
import { ShareService } from './shareservice';
import { Observable } from 'rxjs/Observable';
import { Config } from './config';
import{User} from '../model/user';

@Injectable()
export class UserService {

  
  public URI:string ="user";

  constructor(private _shareService:ShareService ) { }
  public getUserName(username:string ,password:string):Observable<any[]>
  {
   
      return this._shareService.httpGetLogin(Config.URL+this.URI+"/"+username+"/"+password);
  }
  public getUser(searchname:string ,skip:number, pagesize:number):Observable<any[]>
  {
   
      return this._shareService.httpGet(Config.URL+this.URI+"/"+searchname+"/"+skip+"/"+pagesize);
  }
  public getAllUser():Observable<any[]>
  {
   
      return this._shareService.httpGet(Config.URL+this.URI+"/getall");
  }
  
 
  public SaveUser(entity:User,isNew:boolean):Observable<any>
  {
    if(isNew)
    {
      return  this._shareService.httpPost<User>(Config.URL+ this.URI,entity);
     

    }
    else
    {
      return  this._shareService.httpPut<User>(Config.URL+ this.URI,entity);
    }
      
  }
  
  deleteUser<User>(object:User): Observable <any> {  
   return  this._shareService.httpDelete(Config.URL+ this.URI,object);
  }

}
