import { Injectable } from '@angular/core';
import { ShareService } from './shareservice';
import { Observable } from 'rxjs/Observable';
import { Config } from './config';

@Injectable()
export class UserService {

  
  public URI:string ="user";

  constructor(private _shareService:ShareService ) { }
  public getUserName(username:string ,password:string):Observable<any[]>
  {
   
      return this._shareService.httpGetLogin(Config.URL+this.URI+"/"+username+"/"+password);
  }

}
