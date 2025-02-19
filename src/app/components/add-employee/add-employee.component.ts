import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee = {
    id: '',
    name: '',
    company: '',
    designation: '',
    gender: '',
    phone: ''
  };
  isEditing: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async params => {
      if (params['id']) {
        this.isEditing = true;
        await this.loadEmployeeDetails(params['id']);
      }
    });
  }

  async loadEmployeeDetails(id: string) {
    try {
      const employees = await this.apiService.getEmployees();
      if (!employees || !Array.isArray(employees)) {
        console.error("Invalid employee data received");
        return;
      }

      const emp = employees.find(e => e.id.toString() === id);
      if (emp) {
        this.employee = { ...emp };
      } else {
        console.warn(`Employee with ID ${id} not found`);
      }
    } catch (error) {
      console.error("Error fetching employee details", error);
    }
  }

  async addOrUpdateEmployee() {
    if (!this.validateEmployee()) return;

    try {
      if (this.isEditing) {
        await this.apiService.updateEmployee(this.employee);
      } else {
        await this.apiService.addEmployee({ ...this.employee });
      }

      this.router.navigate(['/employees']); // Redirect after save
    } catch (error) {
      console.error("Error saving employee data", error);
    }
  }

  validateEmployee(): boolean {
    const { id, name, company, designation, gender, phone } = this.employee;
    if (!id || !/^emp\d{3}$/.test(id)) {
      alert("Employee ID must be in format 'emp001'!");
      return false;
    }
    if (!name || !company || !designation || !gender || !phone) {
      alert("All fields are required!");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be exactly 10 digits!");
      return false;
    }
    return true;
  }
}
