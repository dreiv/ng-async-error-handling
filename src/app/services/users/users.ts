import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
}

export interface Pending<T> {
  data: Observable<T>;
  status: Observable<Status>;
}

export enum Status {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
