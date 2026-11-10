import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UsersComp } from './users-comp';
import { UsersService } from '../../services/users.service';

describe('UsersComp', () => {
  let component: UsersComp;
  let fixture: ComponentFixture<UsersComp>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersComp],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersComp);
    component = fixture.componentInstance;
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render users returned by the API', () => {
    fixture.detectChanges();
    httpTesting.expectOne(TestBed.inject(UsersService).apiUrl).flush([
      { id: 1, name: 'Leanne Graham', email: 'leanne@example.com' },
    ]);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Leanne Graham');
    expect(fixture.nativeElement.textContent).toContain('leanne@example.com');
  });

  it('should show an error when the API request fails', () => {
    fixture.detectChanges();
    httpTesting
      .expectOne(TestBed.inject(UsersService).apiUrl)
      .flush('Request failed', { status: 500, statusText: 'Server Error' });
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent).toContain(
      'Unable to load users.',
    );
  });
});
