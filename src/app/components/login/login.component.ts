import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ShareDataUserService } from '../../service/share-data-user.service';
import { User } from '../../model/user';


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

  constructor(public urlRouter:Router,
              private _userService:UserService,
              private _shareDataUserService:ShareDataUserService
  ) { }

  ngOnInit() {
  
  }
  public onSubmit()
  {
    this._userService.getUserName(this.editForm.value.username,this.editForm.value.password).subscribe(
      (data) =>{
        console.log(data);
        this.IsLoginSuss  = data["IsLoginSuss"] as boolean
        if(this.IsLoginSuss==true)
        {
           this._shareDataUserService.User = data["data"] as User;
           this.urlRouter.navigate(['/dashboard']);

        }
        else{
          this.messReponse = "Username or Password Is Valid"
        }
      

      }
    )

  }
  public Login()
  {
   

  }

}
