import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComp } from './profile-comp';

describe('ProfileComp', () => {
  let component: ProfileComp;
  let fixture: ComponentFixture<ProfileComp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileComp],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
