import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard-comp',
  imports: [],
  templateUrl: './dashboard-comp.html',
  styleUrl: './dashboard-comp.scss',
})
export class DashboardComp {
  totalEmployees = signal<number>(0);
  totalLeaves = signal<number>(0);
}
