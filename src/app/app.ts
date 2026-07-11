import { Component, computed, signal } from '@angular/core';

interface TodoItem {
  id: number;
  text: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-tutorial');

  newTodo = signal('');
  todoCounter = signal(0);
  todos = signal<TodoItem[]>([]);

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
}
