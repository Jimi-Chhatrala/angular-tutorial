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
