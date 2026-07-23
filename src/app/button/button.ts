import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  label = input<string>();
  clicked = output<void>();

  label2 = input<string>();
  clicked2 = output<string>();

  onClick2() {
    console.log('onClick2 clicked');
    this.clicked2.emit('Button Clicked Successfully.');
  }
}
