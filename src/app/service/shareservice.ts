import { Injectable } from '@angular/core';
import {
    Http,
    Response,
    Headers,
    RequestOptions
} from '@angular/http';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import 'rxjs/add/operator/catch';
import { HttpClient, HttpHandler, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { CategoryService } from './category.service';
import { Config } from './config';
import { Category } from '../model/category';
import { of } from 'rxjs/observable/of';
import { FileInfo } from '@progress/kendo-angular-upload';


@Injectable()
export class ShareService {
    
    constructor(private _http: HttpClient) { }
    
    httpGet(_url:string): Observable<any> {
        
        return this._http.get(_url)
        .map((response: Response) => {
            return {
                data: response["data"],
                total:response["total"]
              
            }
          

        }).
        catch(this.handleError);  
        
        
    }
    httpPostFile(_url:string, file:  any):Observable<any>
    {
        return this._http.post(_url, file);

    }
    httpPost<T>(_url:string,entity:T):Observable<any> {
       
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            
            })
        };
        let body = JSON.stringify(entity);  
     
    
        return this._http.post(_url, body,httpOptions);
       
        
        
    }
    httpPut<T>(_url:string,entity:T): Observable<any> {
       
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            
            })
        };
        let body = JSON.stringify(entity);  
        return this._http.put(_url, body,httpOptions).   
        catch(this.handleError);  
        
        
    }
    httpDelete<T>(url: string,entity: T): Observable < any > {  
        let data = JSON.stringify(entity);  
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            
            }),
            body :data
        };
       
        return this._http.delete(url,httpOptions);

        
      
    }  
    private handleError(error: Response) {  
      
        return Observable.throw(error.json().error || 'Server error');  
    }  

}