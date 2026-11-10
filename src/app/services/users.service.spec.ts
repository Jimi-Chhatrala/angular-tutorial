import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UsersService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should request users from the API', () => {
    const users = [{ id: 1, name: 'Leanne Graham', email: 'leanne@example.com' }];

    service.getUsers().subscribe((result) => {
      expect(result).toEqual(users);
    });

    const request = httpTesting.expectOne(service.apiUrl);
    expect(request.request.method).toBe('GET');
    request.flush(users);
  });
});
