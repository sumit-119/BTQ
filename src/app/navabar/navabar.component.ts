import { AppUser } from './../Models/app.user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-navabar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.css']
})
export class NavabarComponent {
  appUser:AppUser;

  constructor(private auth :AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser);

  }

    logout(){
    this.auth.logout(); 
    }
}
