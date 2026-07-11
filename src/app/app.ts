import { Component, computed, signal } from '@angular/core';
import { DemoRowComponent } from './demo-row/demo-row';

type TodoFilter = 'all' | 'active' | 'completed';

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
  filter = signal<TodoFilter>('all');
  searchTerm = signal('');
  showDemo = signal(false);
  editingTodoId = signal<number | null>(null);
  editingText = signal('');

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
  readonly visibleTodos = computed(() => {
    const todos = this.todos();
    const term = this.searchTerm().trim().toLowerCase();

    const filteredByStatus = (() => {
      switch (this.filter()) {
        case 'active':
          return todos.filter((todo) => !todo.done);
        case 'completed':
          return todos.filter((todo) => todo.done);
        default:
          return todos;
      }
    })();

    if (!term) {
      return filteredByStatus;
    }

    return filteredByStatus.filter((todo) => todo.text.toLowerCase().includes(term));
  });

  constructor() {
    this.loadTodos();
  }

  addTodo() {
    const text = this.newTodo().trim();

    if (!text) return;

    const id = this.todoCounter() + 1;
    this.todoCounter.set(id);

    this.todos.update((list) => [...list, { id, text, done: false }]);
    this.persistTodos();
    this.searchTerm.set('');
    this.newTodo.set('');
  }

  toggleTodo(id: number) {
    this.todos.update((list) => list.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
    this.persistTodos();
  }

  deleteTodo(id: number) {
    this.todos.update((list) => list.filter((item) => item.id !== id));
    this.persistTodos();
  }

  startEditing(todo: TodoItem) {
    this.editingTodoId.set(todo.id);
    this.editingText.set(todo.text);
  }

  cancelEditing() {
    this.editingTodoId.set(null);
    this.editingText.set('');
  }

  saveEdit(id: number) {
    const text = this.editingText().trim();

    if (!text) {
      this.deleteTodo(id);
      this.cancelEditing();
      return;
    }

    this.todos.update((list) => list.map((item) => (item.id === id ? { ...item, text } : item)));
    this.persistTodos();
    this.cancelEditing();
  }

  setFilter(filter: TodoFilter) {
    this.filter.set(filter);
  }

  clearCompleted() {
    this.todos.update((list) => list.filter((todo) => !todo.done));
    this.persistTodos();
  }

  toggleDemo() {
    this.showDemo.update((value) => !value);
  }

  moveTodoUp(id: number) {
    this.todos.update((list) => {
      const index = list.findIndex((item) => item.id === id);

      if (index <= 0) return list;

      const updated = [...list];
      const [item] = updated.splice(index, 1);
      updated.splice(index - 1, 0, item);
      return updated;
    });

    this.persistTodos();
  }

  moveTodoDown(id: number) {
    this.todos.update((list) => {
      const index = list.findIndex((item) => item.id === id);

      if (index === -1 || index >= list.length - 1) return list;

      const updated = [...list];
      const [item] = updated.splice(index, 1);
      updated.splice(index + 1, 0, item);
      return updated;
    });

    this.persistTodos();
  }

  private loadTodos() {
    const stored = localStorage.getItem('todos');

    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as TodoItem[];
      this.todos.set(parsed);
      const highestId = parsed.reduce((max, todo) => Math.max(max, todo.id), 0);
      this.todoCounter.set(highestId);
    } catch {
      localStorage.removeItem('todos');
    }
  }

  private persistTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos()));
  }

  removeFirstIndexItem() {
    this.indexTrackingItems.update((items) => items.slice(1));
  }

  removeFirstIdItem() {
    this.idTrackingItems.update((items) => items.slice(1));
  }
}
