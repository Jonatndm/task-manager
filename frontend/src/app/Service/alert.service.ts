import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type AlertType = 'success' | 'error' | 'warning';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<{message: string, type: AlertType} | null>(null);
  alert$ = this.alertSubject.asObservable();

  //Mostrar Alerta
  showAlert(message: string, type: AlertType = 'success') {
    this.alertSubject.next({message, type});
    //Mostrar por 3 segundos;
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  //Limpiar Alerta
  clearAlert() {
    this.alertSubject.next(null);
  }
  constructor() { }
}
