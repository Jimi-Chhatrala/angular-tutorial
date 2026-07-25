import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-comp',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard-comp.html',
  styleUrl: './dashboard-comp.scss',
})
export class DashboardComp {}
