import { Component } from '@angular/core';
import { AlertService, AlertType } from '../Service/alert.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
})
export class AlertComponent {
    message: string | null = null;
    alertType: AlertType = 'success';

    constructor(private alertService: AlertService) {}

    ngOnInit(): void {
      this.alertService.alert$.subscribe((alert) => {
        if(alert){
          this.message = alert.message;
          this.alertType = alert.type;
        }
        else{
          this.message = null;
        }
      })
    }
}
