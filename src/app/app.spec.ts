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
});
