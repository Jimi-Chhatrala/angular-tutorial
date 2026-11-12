import { Component, computed, effect, inject, Injector, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  count = signal(0);
  theme = signal('light');
  name = signal('John');
  age = signal(25);
  user = signal('John');

  constructor() {
    effect((onCleanup) => {
      console.log('Counter value logged using effect():', this.count());

      localStorage.setItem('theme', this.theme());
      console.log('Theme saved:', this.theme());

      console.log(`User: ${this.name()}, Age: ${this.age()}`);

      const currentUser = this.user();

      const timer = setTimeout(() => {
        console.log(`${currentUser} logged in.`);
      }, 3000);

      onCleanup(() => {
        clearTimeout(timer);
        console.log('Previous timer cleared.', timer);
      });
    });
  }

  myEffect = effect(() => {
    console.log('Use effect() directly as a class property => Count:', this.count());
  });

  injector = inject(Injector);

  ngOnInit() {
    effect(
      () => {
        console.log('Use effect() inside ngOnInit() => Count:', this.count());
      },
      {
        injector: this.injector,
      },
    );
  }

  startEffect() {
    effect(
      () => {
        console.log('Use effect() inside a normal method => Count:', this.count());
      },
      {
        injector: this.injector,
      },
    );
  }

  incrementCount() {
    this.count.update((value) => value + 1);
  }

  changeTheme() {
    this.theme.update((value) => (value === 'light' ? 'dark' : 'light'));
  }

  changeName() {
    this.name.set('David');
  }

  changeAge() {
    this.age.update((value) => value + 1);
  }

  changeUser() {
    this.user.set('David');
  }

  doubleCount = computed(() => {
    return this.count() * 2;
  });
}
