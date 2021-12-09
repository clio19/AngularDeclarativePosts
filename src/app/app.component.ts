import { Component, ChangeDetectionStrategy } from '@angular/core';
import { tap } from 'rxjs';
import { LoaderService } from './services/loader.service';
import { NotificationService } from './services/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Angular-Declarative-Posts';
  showLoader$ = this.loaderService.loadingAction$;
  successMessage$ = this.notificationService.successMessageAction$.pipe(
    tap((message: string) => {
      setTimeout(() => {
        this.notificationService.clearAllMessages();
      }, 3000);
    })
  );
  errorMessage$ = this.notificationService.errorMessageAction$.pipe(
    tap((message: string) => {
      setTimeout(() => {
        this.notificationService.clearAllMessages();
      }, 3000);
    })
  );

  constructor(
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}
}
