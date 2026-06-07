import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  // template: '<h1>Signin works!</h1>',
  // styles: [`
  //     h1 {
  //       color: blue;
  //     }
  // `]

  templateUrl: './signin.html',
  // styleUrl: './signin.scss',
  styleUrls: ['./signin.scss', './signin-2.scss'],
})
export class SigninComponent {
  title: string = 'Signin Component works..';
}
