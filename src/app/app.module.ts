import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AddTaskComponent } from './components/add-task/add-task.component'; 
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'add-task', component: AddTaskComponent },
  { path: 'login', component: LoginComponent },
  { path:'register', component: RegisterComponent } 
];

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    EmployeeListComponent,
    TodoListComponent,
    AddTaskComponent 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
