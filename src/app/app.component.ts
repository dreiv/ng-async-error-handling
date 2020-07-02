import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from './user.service';
import { Observable, Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  users$: Observable<any>;
  loadingError$ = new Subject<boolean>();

  constructor(private userSerice: UserService) {
    this.users$ = userSerice.users$.pipe(
      catchError((error) => {
        // it's important that we log an error here.
        // Otherwise you won't see an error in the console.
        console.error('error loading the list of users', error);
        this.loadingError$.next(true);
        return of();
      })
    );
  }
}
