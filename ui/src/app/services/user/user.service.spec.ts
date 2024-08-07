import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { User } from './user';

export const MOCK_USERS: User[] = [
  { name: 'TEST USER' },
  { name: 'TEST USER 2' },
];

describe(UserService.name, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
