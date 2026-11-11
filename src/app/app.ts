import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  selectedColor = signal('#3498db');

  onColorChange(newColor: string) {
    this.selectedColor.set(newColor);
  }

  copyColor() {
    navigator.clipboard.writeText(this.selectedColor());
    alert('Color code copied to clipboard: ' + this.selectedColor());
  }
}
