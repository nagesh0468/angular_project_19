import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:8800/employees';

  constructor(private http: HttpClient) {}

  async getEmployees() {
    return this.http.get<any[]>(this.apiUrl).toPromise() || [];
  }

  async addEmployee(employee: any) {
    return this.http.post(this.apiUrl, employee).toPromise();
  }

  async updateEmployee(employee: any) {
    return this.http.put(`${this.apiUrl}/${employee.id}`, employee).toPromise();
  }

  async deleteEmployee(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`).toPromise();
  }
}
