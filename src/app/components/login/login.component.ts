import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ShareDataUserService } from '../../service/share-data-user.service';
import { User } from '../../model/user';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public editForm: FormGroup = new FormGroup({
    'username': new FormControl(),
    'password': new FormControl('', Validators.required),
    
});
private messReponse:string= "";
private IsLoginSuss:boolean=true;
private IsLoadingForm:boolean=false;

  constructor(public urlRouter:Router,
              private _userService:UserService,
              private _shareDataUserService:ShareDataUserService,
              private toastr: ToastrService
  ) { }

  ngOnInit() {
  
  }
  public onSubmit()
  {
    this.Login();

  }
 
  public Login()
  {
    
   
    this.IsLoadingForm=true;
    this._userService.getUserName(this.editForm.value.username,this.editForm.value.password).subscribe(
      (data) =>{
        
        this.IsLoginSuss  = data["IsLoginSuss"] as boolean
        if(this.IsLoginSuss==true)
        {
           this._shareDataUserService.User = data["data"] as User;
          
           this.urlRouter.navigate(['/dashboard']);
           this.IsLoadingForm=false;

        }
        else{
          this.IsLoadingForm=false;
          this.toastr.success("Username or Password Is Valid")
          // this.messReponse = "Username or Password Is Valid"
        }
      

      },
      err=>{   this.IsLoadingForm=false;
        this.toastr.success(err)
      }

    )
  }

}
