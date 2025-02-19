import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://localhost:3000/employees'; // JSON-Server API URL

  constructor() {}

  // GET: Fetch all employees
  async getEmployees() {
    try {
      const response = await axios.get(this.API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  }

  // POST: Add a new employee
  async addEmployee(employee: { id: number; name: string; company: string; designation: string }) {
    try {
      const response = await axios.post(this.API_URL, employee);
      return response.data;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error;
    }
  }

  // DELETE: Remove an employee by ID
  async deleteEmployee(id: number) {
    try {
      await axios.delete(`${this.API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error;
    }
  }
}
