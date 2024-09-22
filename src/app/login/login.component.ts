import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}
  
  
  get(){
    localStorage.getItem('username');
  }
  
  onLogin(){
    if(this.username && this.password){
        localStorage.setItem('username', this.username);

        this.router.navigate(['/tasks']);
    }else {
      alert('Por favor, ingresa un usuario y contrasena valida,');
    }
  }
}
