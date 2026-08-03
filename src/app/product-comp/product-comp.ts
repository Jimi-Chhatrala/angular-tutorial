import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-comp',
  imports: [],
  templateUrl: './product-comp.html',
  styleUrl: './product-comp.scss',
})
export class ProductComp implements OnInit {
  productId = '';

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';

    this.activatedRoute.paramMap.subscribe((params) => {
      this.productId = params.get('id') ?? '';
      this.cdr.detectChanges();
    });
  }
}
