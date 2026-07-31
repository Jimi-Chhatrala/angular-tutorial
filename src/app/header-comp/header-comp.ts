import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-comp',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header-comp.html',
  styleUrl: './header-comp.scss',
})
export class HeaderComp {}
