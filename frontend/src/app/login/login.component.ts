import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../alert.service';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  user: string = '';
  password: string = '';
  constructor(private authService: AuthService,private router: Router, private alertService: AlertService) {}

  onSubmit(){
    this.authService.login(this.user, this.password).subscribe({
      next: (response) => {
        if (response) {
          this.authService.setToken(response.token);
          this.alertService.showAlert('Usuario ingresado correctamente!', 'success');
          this.router.navigate(['/tasks']);
        }
        else {
          this.alertService.showAlert('Usuario o contraseña incorrectos. Inténtalo de nuevo.', 'error');
        }
      },
      error: (error) => {
        this.alertService.showAlert('Ocurrió un error. Por favor, intenta nuevamente.', 'error');
      }
    });
  }
  


}
