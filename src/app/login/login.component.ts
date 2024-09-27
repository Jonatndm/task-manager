import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: string = '';
  password: string = '';
  constructor(private router: Router, private alertService: AlertService) {}

  onSubmit(){
    const storedUser = localStorage.getItem('username');

    if(storedUser){
      const user = JSON.parse(storedUser);
      if(user.username === this.user && user.password === this.password){
        localStorage.setItem('user', this.user);
        this.alertService.showAlert('Usuario ingresado correctamene!', 'success');
        this.router.navigate(['/tasks']);
      }
      else{
        this.alertService.showAlert('Credenciales invalidas!', 'error');
      }
    }
    else{
      this.alertService.showAlert('No hay usuario registrado', 'warning');
    }
  }
  


}
