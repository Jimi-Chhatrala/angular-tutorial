import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  imageUrl: string =
    'https://img.magnific.com/premium-vector/blue-car-flat-style-illustration-isolated-white-background_108231-795.jpg?semt=ais_hybrid&w=740&q=80';
  isDisabled: boolean = false;
  username = 'John Doe'
  isActive = false;
  boxWidth = 5;
  bgColor = 'blue'
  count = signal(5);
}
