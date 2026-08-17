import { Component, effect, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-comp',
  imports: [],
  templateUrl: './products-comp.html',
  styleUrl: './products-comp.scss',
})
export class ProductsComp {
  search = signal('');
  products = signal<string[]>(['Phone', 'Smart Phone', 'Tables', 'Ear Phone', 'Keyboard']);
  filtered = signal<string[]>(this.products());

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    /// URL to signal
    this.route.queryParamMap.subscribe((params) => {
      this.search.set(params.get('search') || '');
    });

    /// Signal to UI Update
    effect(() => {
      const value = this.search().toLowerCase();
      this.filtered.set(this.products().filter((p) => p.toLowerCase().includes(value)));
    });
  }

  updateUrl() {
    this.router.navigate([], {
      queryParams: { search: this.search() },
    });
  }
}
