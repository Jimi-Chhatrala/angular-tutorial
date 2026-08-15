import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-comp',
  imports: [],
  templateUrl: './login-comp.html',
  styleUrl: './login-comp.scss',
})
export class LoginComp {
  constructor(private router: Router) {}

  login() {
    this.router.navigate(['dashboard']);
  }
}
