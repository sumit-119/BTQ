import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';
import { AppUser } from './Models/app.user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
@Injectable()
export class AuthService {

  user$:Observable<firebase.User>
  constructor(private userService:UserService,private afAuth:AngularFireAuth,private route:ActivatedRoute) { 
    this.user$ = afAuth.authState;
  }

  Login(){
    let returnUrl =  this.route.snapshot.queryParamMap.get('returnUrl')|| '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
  logout(){
  this.afAuth.auth.signOut();
  }
  get appUser$():Observable<AppUser>{
    return this.user$ 
    .switchMap(user=>{
        if(user)return this.userService.get(user.uid);

        return Observable.of(null);
    }); 
  }
}
