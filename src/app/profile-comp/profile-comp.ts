import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-comp',
  imports: [RouterLink],
  templateUrl: './profile-comp.html',
  styleUrl: './profile-comp.scss',
})
export class ProfileComp {
  canDeactivate() {
    return confirm('Do you want to leave this page?');
  }
}
