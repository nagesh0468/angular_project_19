import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private employeeApiUrl = 'http://localhost:8800/employees';
  private todoApiUrl = 'http://localhost:8800/todo-list';

  constructor(private http: HttpClient) {}

  // 🟢 Employee CRUD Operations
  async getEmployees() {
    return this.http.get<any[]>(this.employeeApiUrl).toPromise() || [];
  }

  async addEmployee(employee: any) {
    return this.http.post(this.employeeApiUrl, employee).toPromise();
  }

  async updateEmployee(employee: any) {
    return this.http.put(`${this.employeeApiUrl}/${employee.id}`, employee).toPromise();
  }

  async deleteEmployee(id: string) {
    return this.http.delete(`${this.employeeApiUrl}/${id}`).toPromise();
  }

  // 🟢 To-Do List CRUD Operations
  async getTasks() {
    return this.http.get<any[]>(this.todoApiUrl).toPromise() || [];
  }

  async addTask(task: any) {
    return this.http.post(this.todoApiUrl, task).toPromise();
  }

  async updateTask(task: any) {
    return this.http.put(`${this.todoApiUrl}/${task.id}`, task).toPromise();
  }

  async deleteTask(id: string) {
    return this.http.delete(`${this.todoApiUrl}/${id}`).toPromise();
  }
}
