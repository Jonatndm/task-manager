import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private alertService: AlertService){}

  onRegister(){
    if(this.email && this.password){
      const user = {
        email: this.email,
        password: this.password,
      };
      localStorage.setItem('user', JSON.stringify(user));
      this.alertService.showAlert('Usuario registrado correctamente!', 'success');
      this.router.navigate(['/login']);
    }else{
      this.alertService.showAlert('Por favor ingrese correo y contrasena valida', 'warning');
    }
  }
}
