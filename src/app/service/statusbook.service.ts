import { Injectable } from '@angular/core';
import { ShareService } from './shareservice';
import { Config } from './config';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StatusbookService {

  
  public URI:string ="statusbook";

  constructor(private _shareService:ShareService ) { }
 
  public getAllStatusBook():Observable<any[]>
  {
   
      return this._shareService.httpGet(Config.URL+this.URI+"/getall");
  }
}
