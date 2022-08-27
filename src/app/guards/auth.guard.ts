import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  canLoad(): boolean {

    if(this.auth.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(['/welcome'], {replaceUrl: true});
      return false;
    }

  }

}
