import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    //Si tiene sesión redirecciona al home page
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/home']);
    }
  }
}
