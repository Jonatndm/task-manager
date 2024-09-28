import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';
import { AuthService } from '../Service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService){}

  onRegister(){
    this.authService.register(this.user, this.password).subscribe({
      next: () => {
        this.alertService.showAlert('Usuario registrado correctamente!', 'success');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
      }
    });
  }
}
