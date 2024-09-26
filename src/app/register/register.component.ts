import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router){}

  onRegister(){
    if(this.email && this.password){
      const user = {
        email: this.email,
        password: this.password,
      };
      localStorage.setItem('user', JSON.stringify(user));
      alert('Usuario registrado correctamente!');
      this.router.navigate(['/login']);
    }else{
      alert('Por favor ingrese correo y contrasena valida');
    }
  }
}
