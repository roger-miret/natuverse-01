import { CanDeactivateFn } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DialogsService } from '../../services/dialogs.service';
import { inject } from '@angular/core';

//interface que servirà per reutilitzar guards en diversos serveis
// export interface IDeactivateGuard{
//   exitGuard: () => boolean;
// }

export interface ComponentCanDeactivate{
  canDeactivate():boolean;
  // confirm():boolean;
}

//implementació de la interface en guard amb servei NavigationService
export const ConfirmBeforeLeavingGuard:CanDeactivateFn<ComponentCanDeactivate> = (component: ComponentCanDeactivate): Observable<boolean> => {
  const dialogsService=inject(DialogsService);
  if (component.canDeactivate && component.canDeactivate()) {
     return of(true);
   }
   return dialogsService.openConfirmModal('Are you sure you want to SORTIR? Data will be lost.', 'Leave');
};
