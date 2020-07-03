import { Component, ChangeDetectionStrategy } from '@angular/core';

import { UserService } from './services/users/user.service';
import { User, Pending, Status } from './services/users/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly Status = Status;
  readonly users$: Pending<User[]>;

  constructor(private userSerice: UserService) {
    this.users$ = userSerice.users$();
  }
}
