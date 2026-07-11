import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the todo app heading', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Todo App');
  });

  it('toggles the dark mode state', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app.darkMode()).toBeFalse();

    app.toggleTheme();

    expect(app.darkMode()).toBeTrue();
  });

  it('adds a todo when Enter is pressed', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input.todo-input') as HTMLInputElement;
    input.value = 'Buy milk';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));

    fixture.detectChanges();

    const todoText = fixture.nativeElement.querySelector('.todo-text')?.textContent;
    expect(todoText).toContain('Buy milk');
  });

  it('shows a helpful empty state when the current filter has no matching todos', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.todos.set([{ id: 1, text: 'Buy milk', done: false }]);
    app.filter.set('completed');
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No completed tasks yet.');
  });

  it('reorders todos when a dragged item is dropped on another item', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.todos.set([
      { id: 1, text: 'First', done: false },
      { id: 2, text: 'Second', done: false },
      { id: 3, text: 'Third', done: false },
    ]);

    app.reorderTodos(1, 3);

    expect(app.todos().map((todo) => todo.id)).toEqual([2, 3, 1]);
  });

  it('bulk deletes the selected todos', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.todos.set([
      { id: 1, text: 'First', done: false },
      { id: 2, text: 'Second', done: false },
    ]);

    app.toggleTodoSelection(1);
    app.toggleTodoSelection(2);
    app.bulkDeleteSelected();

    expect(app.todos()).toEqual([]);
    expect(app.selectedTodoIds()).toEqual([]);
  });

  it('restores a deleted todo when undo is used before the timeout', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.todos.set([{ id: 1, text: 'First', done: false }]);

    app.deleteTodo(1);

    expect(app.todos()).toEqual([]);
    expect(app.pendingDeletedTodo()?.text).toBe('First');

    app.undoDelete();

    expect(app.todos()).toEqual([{ id: 1, text: 'First', done: false }]);
    expect(app.pendingDeletedTodo()).toBeNull();
  });

  it('selects all visible todos when the select-all control is used', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.todos.set([
      { id: 1, text: 'First', done: false },
      { id: 2, text: 'Second', done: false },
      { id: 3, text: 'Third', done: true },
    ]);
    app.filter.set('active');

    app.toggleSelectAllVisible();

    expect(app.selectedTodoIds()).toEqual([1, 2]);
  });

  it('adds a todo with a due date and priority', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('input.todo-input') as HTMLInputElement;
    const dueInput = fixture.nativeElement.querySelector('input[name="dueDate"]') as HTMLInputElement;
    const prioritySelect = fixture.nativeElement.querySelector('select[name="priority"]') as HTMLSelectElement;
    const addButton = fixture.nativeElement.querySelector('button.add-btn') as HTMLButtonElement;

    input.value = 'Plan sprint';
    input.dispatchEvent(new Event('input'));
    dueInput.value = '2026-07-15';
    dueInput.dispatchEvent(new Event('input'));
    prioritySelect.value = 'high';
    prioritySelect.dispatchEvent(new Event('change'));
    addButton.click();

    fixture.detectChanges();

    const meta = fixture.nativeElement.querySelector('.todo-meta');
    expect(meta?.textContent).toContain('Due: 2026-07-15');
    expect(meta?.textContent).toContain('High');
  });
});
