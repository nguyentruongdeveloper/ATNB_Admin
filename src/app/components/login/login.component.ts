import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public urlRouter:Router) { }

  ngOnInit() {
  
  }
  public Login()
  {
    this.urlRouter.navigate(['/dashboard']);

  }

}
