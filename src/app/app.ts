import { Component, computed, signal } from '@angular/core';
import { DemoRowComponent } from './demo-row/demo-row';

interface TodoItem {
  id: number;
  text: string;
  done: boolean;
}

interface TrackingDemoItem {
  id: number;
  label: string;
  note: string;
  badge: string;
}

@Component({
  selector: 'app-root',
  imports: [DemoRowComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  newTodo = signal('');
  todoCounter = signal(0);
  todos = signal<TodoItem[]>([]);

  indexTrackingItems = signal<TrackingDemoItem[]>([
    { id: 101, label: 'Alpha', note: 'Position-based item', badge: 'A' },
    { id: 102, label: 'Beta', note: 'Position-based item', badge: 'B' },
    { id: 103, label: 'Gamma', note: 'Position-based item', badge: 'C' },
  ]);

  idTrackingItems = signal<TrackingDemoItem[]>([
    { id: 201, label: 'One', note: 'Stable id item', badge: '1' },
    { id: 202, label: 'Two', note: 'Stable id item', badge: '2' },
    { id: 203, label: 'Three', note: 'Stable id item', badge: '3' },
  ]);

  readonly todoCount = computed(() => this.todos().length);
  readonly completedCount = computed(() => this.todos().filter((todo) => todo.done).length);

  addTodo() {
    const text = this.newTodo().trim();

    if (!text) return;

    const id = this.todoCounter() + 1;
    this.todoCounter.set(id);

    this.todos.update((list) => [...list, { id, text, done: false }]);
    this.newTodo.set('');
  }

  toggleTodo(id: number) {
    this.todos.update((list) => list.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
  }

  deleteTodo(id: number) {
    this.todos.update((list) => list.filter((item) => item.id !== id));
  }

  removeFirstIndexItem() {
    this.indexTrackingItems.update((items) => items.slice(1));
  }

  removeFirstIdItem() {
    this.idTrackingItems.update((items) => items.slice(1));
  }
}
