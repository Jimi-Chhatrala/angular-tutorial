import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComp } from './page-not-found-comp';

describe('PageNotFoundComp', () => {
  let component: PageNotFoundComp;
  let fixture: ComponentFixture<PageNotFoundComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageNotFoundComp],
    }).compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
