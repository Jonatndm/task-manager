import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  constructor(private router: Router) {}

  onSubmit(){
    const storedUser = localStorage.getItem('user');

    if(storedUser){
      const user = JSON.parse(storedUser);
      if(user.email === this.email && user.password === this.password){
        localStorage.setItem('email', this.email);
        this.router.navigate(['/tasks']);
      }
      else{
        alert('Credenciales invalidas!');
      }
    }
    else{
      alert('No hay usuario registrado');
    }
  }
  


}
