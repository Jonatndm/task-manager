import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path: 'tasks', component: TaskComponent},
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo:'/login', pathMatch: 'full'},
];
