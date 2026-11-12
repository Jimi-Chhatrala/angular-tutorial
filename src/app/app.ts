import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Example 1
  // Normal writable signal
  count = signal(5);

  // Computed signal
  doubleCount = computed(() => this.count() * 2);

  increment() {
    this.count.update((value) => value + 1);
  }

  // Example 2
  num1 = signal(10);
  num2 = signal(20);

  total = computed(() => this.num1() + this.num2());

  // Example 3
  employees = signal([
    { id: 1, name: 'Rahul', salary: 40000 },
    { id: 2, name: 'Amit', salary: 60000 },
    { id: 3, name: 'Priya', salary: 75000 },
    { id: 4, name: 'Neha', salary: 45000 },
  ]);

  highSalaryEmployees = computed(() =>
    this.employees().filter((employee) => employee.salary > 50000),
  );

  // Example 4
  // Writable signal
  price = signal(100);

  // Computed signal
  tax = computed(() => this.price() * 0.18);

  // Computed signal
  totalPrice = computed(() => this.price() + this.tax());
}
