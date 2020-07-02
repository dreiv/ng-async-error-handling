import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService, User } from './user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  users$: Observable<User[]>;

  constructor(private userSerice: UserService) {
    this.users$ = userSerice.users$;
  }
}
