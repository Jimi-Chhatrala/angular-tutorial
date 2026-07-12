import { Component, EventEmitter, input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.scss',
})
export class Child {
  name = input<string>();

  @Output() notify = new EventEmitter<string>();

  sendToParentComponent() {
    this.notify.emit('Hello Parent (Event Emitter)');
  }

  message = signal('Hello Parent (Signal)');

  updateMessage() {
    this.message.set('Updated from Child Component');
  }
}
