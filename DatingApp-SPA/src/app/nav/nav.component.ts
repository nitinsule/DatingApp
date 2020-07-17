import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.Login(this.model).subscribe(success=> {
      console.log('Logged in successfully');
      },
      error =>{
      console.log(error);
       }
    );
  }

  loggedIn(): any{
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout(): any{
    localStorage.removeItem('token');
    console.log('Logged out');
  }

}
