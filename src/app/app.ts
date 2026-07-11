import { Component, computed, OnDestroy, signal } from '@angular/core';
import { DemoRowComponent } from './demo-row/demo-row';

type TodoFilter = 'all' | 'active' | 'completed';
type TodoCategoryFilter = TodoCategory | 'all';

type TodoPriority = 'low' | 'medium' | 'high';
type TodoCategory = 'work' | 'personal' | 'study' | 'errands' | 'other';

interface TodoItem {
  id: number;
  text: string;
  done: boolean;
  dueDate?: string;
  priority?: TodoPriority;
  category?: TodoCategory;
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
export class App implements OnDestroy {
  protected readonly title = signal('angular-tutorial');

  newTodo = signal('');
  newDueDate = signal('');
  newPriority = signal<TodoPriority>('medium');
  newCategory = signal<TodoCategory>('other');
  todoCounter = signal(0);
  todos = signal<TodoItem[]>([]);
  filter = signal<TodoFilter>('all');
  categoryFilter = signal<TodoCategoryFilter>('all');
  searchTerm = signal('');
  showDemo = signal(false);
  reorderMode = signal(false);
  selectedTodoIds = signal<number[]>([]);
  pendingDeletedTodo = signal<TodoItem | null>(null);
  pendingDeletedIndex = signal<number | null>(null);
  undoNotice = signal('');
  editingTodoId = signal<number | null>(null);
  editingText = signal('');
  draggedTodoId = signal<number | null>(null);
  dropTargetId = signal<number | null>(null);
  touchSourceId = signal<number | null>(null);
  touchDropTargetId = signal<number | null>(null);
  private undoTimeoutId: ReturnType<typeof window.setTimeout> | null = null;

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

    const filteredByCategory = (() => {
      const category = this.categoryFilter();
      if (category === 'all') {
        return filteredByStatus;
      }

      return filteredByStatus.filter((todo) => todo.category === category);
    })();

    if (!term) {
      return filteredByCategory;
    }

    return filteredByCategory.filter((todo) => todo.text.toLowerCase().includes(term));
  });

  constructor() {
    this.loadTodos();
  }

  addTodo() {
    const text = this.newTodo().trim();

    if (!text) return;

    const id = this.todoCounter() + 1;
    this.todoCounter.set(id);

    this.todos.update((list) => [
      ...list,
      {
        id,
        text,
        done: false,
        dueDate: this.newDueDate().trim() || undefined,
        priority: this.newPriority(),
        category: this.newCategory(),
      },
    ]);
    this.persistTodos();
    this.searchTerm.set('');
    this.newTodo.set('');
    this.newDueDate.set('');
    this.newPriority.set('medium');
    this.newCategory.set('other');
  }

  updateDueDate(event: Event) {
    const target = event.target as HTMLInputElement | null;
    this.newDueDate.set(target?.value ?? '');
  }

  updatePriority(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const value = (target?.value as TodoPriority | undefined) ?? 'medium';
    this.newPriority.set(value);
  }

  updateCategory(event: Event) {
    const target = event.target as HTMLSelectElement | null;
    const value = (target?.value as TodoCategory | undefined) ?? 'other';
    this.newCategory.set(value);
  }

  toggleTodo(id: number) {
    this.todos.update((list) => list.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
    this.persistTodos();
  }

  toggleTodoSelection(id: number) {
    this.selectedTodoIds.update((selectedIds) =>
      selectedIds.includes(id) ? selectedIds.filter((selectedId) => selectedId !== id) : [...selectedIds, id],
    );
  }

  isTodoSelected(id: number) {
    return this.selectedTodoIds().includes(id);
  }

  areAllVisibleTodosSelected() {
    const visibleIds = this.visibleTodos().map((todo) => todo.id);
    return visibleIds.length > 0 && visibleIds.every((id) => this.selectedTodoIds().includes(id));
  }

  toggleSelectAllVisible() {
    const visibleIds = this.visibleTodos().map((todo) => todo.id);
    const selectedIds = this.selectedTodoIds();

    if (visibleIds.length === 0) {
      return;
    }

    const allVisibleSelected = visibleIds.every((id) => selectedIds.includes(id));

    if (allVisibleSelected) {
      this.selectedTodoIds.set(selectedIds.filter((id) => !visibleIds.includes(id)));
      return;
    }

    this.selectedTodoIds.set([...new Set([...selectedIds, ...visibleIds])]);
  }

  bulkMarkSelectedComplete() {
    const selectedIds = this.selectedTodoIds();

    if (selectedIds.length === 0) {
      return;
    }

    this.todos.update((list) => list.map((todo) => (selectedIds.includes(todo.id) ? { ...todo, done: true } : todo)));
    this.persistTodos();
    this.selectedTodoIds.set([]);
  }

  bulkDeleteSelected() {
    const selectedIds = this.selectedTodoIds();

    if (selectedIds.length === 0) {
      return;
    }

    this.todos.update((list) => list.filter((todo) => !selectedIds.includes(todo.id)));
    this.persistTodos();
    this.selectedTodoIds.set([]);
  }

  clearSelection() {
    this.selectedTodoIds.set([]);
  }

  deleteTodo(id: number) {
    const currentTodos = this.todos();
    const todoToDelete = currentTodos.find((item) => item.id === id);

    if (!todoToDelete) {
      return;
    }

    const deletedIndex = currentTodos.findIndex((item) => item.id === id);

    this.clearUndoTimeout();
    this.todos.set(currentTodos.filter((item) => item.id !== id));
    this.persistTodos();
    this.pendingDeletedTodo.set(todoToDelete);
    this.pendingDeletedIndex.set(deletedIndex);
    this.undoNotice.set(`Deleted "${todoToDelete.text}". You can undo for 4 seconds.`);
    this.undoTimeoutId = window.setTimeout(() => {
      this.pendingDeletedTodo.set(null);
      this.pendingDeletedIndex.set(null);
      this.undoNotice.set('');
      this.undoTimeoutId = null;
    }, 4000);
  }

  undoDelete() {
    const todoToRestore = this.pendingDeletedTodo();
    const restoredIndex = this.pendingDeletedIndex();

    if (!todoToRestore) {
      return;
    }

    this.clearUndoTimeout();
    this.todos.update((list) => {
      const updated = [...list];

      if (restoredIndex !== null && restoredIndex >= 0 && restoredIndex <= updated.length) {
        updated.splice(restoredIndex, 0, todoToRestore);
      } else {
        updated.push(todoToRestore);
      }

      return updated;
    });
    this.persistTodos();
    this.pendingDeletedTodo.set(null);
    this.pendingDeletedIndex.set(null);
    this.undoNotice.set('');
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

  getPriorityLabel(priority?: TodoPriority) {
    switch (priority) {
      case 'high':
        return 'High';
      case 'low':
        return 'Low';
      default:
        return 'Medium';
    }
  }

  getCategoryLabel(category?: TodoCategory) {
    switch (category) {
      case 'work':
        return 'Work';
      case 'personal':
        return 'Personal';
      case 'study':
        return 'Study';
      case 'errands':
        return 'Errands';
      default:
        return 'Other';
    }
  }

  setFilter(filter: TodoFilter) {
    this.filter.set(filter);
  }

  setCategoryFilter(category: TodoCategoryFilter) {
    this.categoryFilter.set(category);
  }

  clearCompleted() {
    this.todos.update((list) => list.filter((todo) => !todo.done));
    this.persistTodos();
  }

  toggleDemo() {
    this.showDemo.update((value) => !value);
  }

  toggleReorderMode() {
    this.reorderMode.update((value) => {
      if (value) {
        this.clearReorderMarkers();
      }

      return !value;
    });
  }

  clearReorderMarkers() {
    this.draggedTodoId.set(null);
    this.dropTargetId.set(null);
    this.touchSourceId.set(null);
    this.touchDropTargetId.set(null);
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

  reorderTodos(fromId: number, toId: number) {
    this.todos.update((list) => {
      const fromIndex = list.findIndex((item) => item.id === fromId);
      const toIndex = list.findIndex((item) => item.id === toId);

      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
        return list;
      }

      const updated = [...list];
      const [movedItem] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedItem);
      return updated;
    });

    this.persistTodos();
  }

  dropTodo(targetId: number) {
    const draggedId = this.draggedTodoId();

    if (draggedId === null || draggedId === targetId) {
      this.clearReorderMarkers();
      return;
    }

    this.reorderTodos(draggedId, targetId);
    this.clearReorderMarkers();
  }

  setDropTarget(id: number) {
    if (!this.reorderMode()) {
      return;
    }

    this.dropTargetId.set(id);
  }

  clearDropTarget(id: number) {
    if (this.dropTargetId() === id) {
      this.dropTargetId.set(null);
    }
  }

  selectTodoForTouch(id: number) {
    if (!this.reorderMode()) {
      return;
    }

    this.touchSourceId.set(id);
  }

  setTouchDropTarget(event: TouchEvent, id: number) {
    if (!this.reorderMode()) {
      return;
    }

    event.stopPropagation();
    if (this.touchSourceId() !== null && this.touchSourceId() !== id) {
      this.touchDropTargetId.set(id);
    }
  }

  cancelTouchReorder() {
    this.touchSourceId.set(null);
    this.touchDropTargetId.set(null);
  }

  commitTouchReorder(targetId: number) {
    const draggedId = this.touchSourceId();

    if (draggedId === null || draggedId === targetId) {
      this.touchSourceId.set(null);
      this.touchDropTargetId.set(null);
      return;
    }

    this.reorderTodos(draggedId, targetId);
    this.touchSourceId.set(null);
    this.touchDropTargetId.set(null);
  }

  ngOnDestroy() {
    this.clearUndoTimeout();
  }

  private clearUndoTimeout() {
    if (this.undoTimeoutId !== null) {
      window.clearTimeout(this.undoTimeoutId);
      this.undoTimeoutId = null;
    }
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
