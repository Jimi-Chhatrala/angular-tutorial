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

  it('should render the login form', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Login Form Based on Signal');
    expect(compiled.querySelector('input[type="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[type="password"]')).toBeTruthy();
  });

  it('should show validation errors when submitted empty', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    const errors = fixture.nativeElement.querySelectorAll('.errors');
    expect(errors[0].textContent).toContain('Email is required.');
    expect(errors[1].textContent).toContain('Password is required.');
  });

  it('should reject an invalid email address', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const email = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
    email.value = 'not-an-email';
    email.dispatchEvent(new Event('input', { bubbles: true }));

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('#email-errors')?.textContent).toContain(
      'Enter a valid email address.',
    );
    expect(fixture.nativeElement.textContent).not.toContain('Form is valid.');
  });

  it('should accept valid values without exposing credentials', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();

    const email = fixture.nativeElement.querySelector('#email') as HTMLInputElement;
    const password = fixture.nativeElement.querySelector('#password') as HTMLInputElement;
    email.value = 'person@example.com';
    email.dispatchEvent(new Event('input', { bubbles: true }));
    password.value = 'secure-password';
    password.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain(
      'Form is valid. Authentication is not connected yet.',
    );
    expect(fixture.nativeElement.textContent).not.toContain('secure-password');
  });
});
