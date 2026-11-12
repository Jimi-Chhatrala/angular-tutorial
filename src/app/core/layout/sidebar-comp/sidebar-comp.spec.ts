import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComp } from './sidebar-comp';

describe('SidebarComp', () => {
  let component: SidebarComp;
  let fixture: ComponentFixture<SidebarComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComp],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
