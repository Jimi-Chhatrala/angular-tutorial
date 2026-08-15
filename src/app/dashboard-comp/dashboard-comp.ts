import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-comp',
  imports: [],
  templateUrl: './dashboard-comp.html',
  styleUrl: './dashboard-comp.scss',
})
export class DashboardComp {
  constructor(private router: Router) {}

  openProduct() {
    this.router.navigate(['product', 101]);
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
