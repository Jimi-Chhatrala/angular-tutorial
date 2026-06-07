import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-events',
  imports: [],
  templateUrl: './events.html',
  styleUrl: './events.scss',
})
export class Events {
  isFormSubmitted = '';
  eventData: any;
  // count = 0
  count = signal(0);
  increment() {
    // this.count++;
    this.count.update((c) => c + 1);
  }

  showEvent(e: any) {
    console.log({e});
    this.eventData = JSON.parse(JSON.stringify(e));
  }

  username = '';

  updateUsernameValue(value: string) {
    this.username = value;
  }

  handleSubmit(e: any) {
    e.preventDefault();
    console.log('Form submitted');
    this.isFormSubmitted = 'Form submitted';
  }
}
