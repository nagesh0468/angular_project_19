import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'todo-list', component: TodoListComponent }, 
  { path: 'add-task', component: AddTaskComponent },
  {path : 'register', component: RegisterComponent },
  {path : 'login', component: LoginComponent }   
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
