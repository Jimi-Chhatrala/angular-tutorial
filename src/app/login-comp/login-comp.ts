import { Component } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-comp',
  imports: [],
  templateUrl: './login-comp.html',
  styleUrl: './login-comp.scss',
})
export class LoginComp {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  login() {
    this.authService.login();
    this.router.navigate(['/dashboard']);
  }
}
