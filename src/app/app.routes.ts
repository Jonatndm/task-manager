import { Component, Injectable, NgModule } from '@angular/core';
import { CanActivate, Router, RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: 'tasks', component: TaskComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo:'/login', pathMatch: 'full'},
];

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(): boolean {
        const user = localStorage.getItem('username');
        if (user) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}