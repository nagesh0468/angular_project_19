import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  providers: [ApiService], 
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  private apiService = inject(ApiService);
  public router = inject(Router); // ✅ Made public

  async ngOnInit() {
    await this.loadEmployees();
  }

  async loadEmployees() {
    try {
      this.employees = (await this.apiService.getEmployees()) || []; // ✅ Handle undefined
    } catch (error) {
      console.error("Error loading employees:", error);
    }
  }

  async deleteEmployee(id: string) {
    try {
      await this.apiService.deleteEmployee(id);
      await this.loadEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }

  editEmployee(employee: any) {
    this.router.navigate(['/add-employee'], { queryParams: { id: employee.id } });
  }
}
