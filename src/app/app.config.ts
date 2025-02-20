import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'todo-list', component: TodoListComponent }, 
  { path: 'add-task', component: AddTaskComponent }   
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient()
  ]
};
