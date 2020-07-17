import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit(): void {
  }

  login(): any{
    this.authService.Login(this.model).subscribe(success => {
      this.alertify.success('Logged in successfully');
      },
      error => {
        this.alertify.error(error);
       }
    );
  }

  loggedIn(): any{
    return this.authService.loggedIn();
  }

  logout(): any{
    localStorage.removeItem('token');
    this.alertify.message('Logged out');
  }

}
