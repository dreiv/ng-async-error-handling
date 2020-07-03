import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, defer } from 'rxjs';
import { delay, map, catchError, tap, retry } from 'rxjs/operators';

import { User, Pending, Status } from './users';

const seedUsers = [
  {
    id: '7583926a-1d0b-4a3b-bc75-fe3cd5024172',
    name: 'Khadijah Clayton'
  },
  {
    id: '9e9de557-a481-4289-8fd5-15f172fab2f8',
    name: 'Caroline Mayer'
  },
  {
    id: '9f75f8fc-3c1e-4b06-a966-f0a0a6fdc99d',
    name: 'Shane Thomson'
  },
  {
    id: '5e5a5e82-b2d9-4a4b-8f43-e74823aa187b',
    name: 'Saskia Hubbard'
  }
];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: BehaviorSubject<User[]>;

  constructor() {
    this.users = new BehaviorSubject<User[]>(seedUsers);
  }

  users$(): Pending<User[]> {
    const status = new ReplaySubject<Status>(1);

    const request = this.users.asObservable()
      .pipe(
        delay(1600),
        retry(2),
        map(res => {
          if (Math.random() < 0.7) {
            throw new Error('Error loading users');
          }

          return res;
        }),
        catchError(error => {
          status.next(Status.ERROR);

          throw error;
        }),
        tap(() => status.next(Status.SUCCESS))
      );

    const data = defer(() => {
      status.next(Status.LOADING);

      return request;
    });

    return { data, status };
  }
}
