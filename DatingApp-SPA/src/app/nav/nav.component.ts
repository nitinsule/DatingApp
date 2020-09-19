import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {AlertifyService} from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  photoUrl: string ;

  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    console.log(this.authService.currentPhotoUrl);
  }

  login(): any{
    this.authService.Login(this.model).subscribe(success => {
      this.alertify.success('Logged in successfully');
      },
      error => {
        this.alertify.error(error);
       },
       () => {
        this.router.navigate(['/members']);
       }
    );
  }

  loggedIn(): any{
    return this.authService.loggedIn();
  }

  logout(): any{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodeToken = null;
    this.authService.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }

}
