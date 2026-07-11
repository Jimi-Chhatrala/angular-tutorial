import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-demo-row',
  imports: [],
  template: `
    <div class="demo-item">
      <span class="demo-badge">{{ badge }}</span>
      <div class="demo-item-content">
        <strong>{{ label }}</strong>
        <span>{{ note }}</span>
        <small class="local-state">Local state: {{ localState() }}</small>
      </div>
    </div>
  `,
})
export class DemoRowComponent {
  @Input() label = '';
  @Input() note = '';
  @Input() badge = '';
  @Input() itemId = 0;

  readonly localState = signal('');
  private initialized = false;

  ngOnChanges() {
    if (!this.initialized) {
      this.localState.set(`memo:${this.label}`);
      this.initialized = true;
    }
  }
}
