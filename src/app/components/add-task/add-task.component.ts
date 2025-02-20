import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  task = { 
    id: '', 
    name: '', 
    plannedDate: '' 
  };

  tasks: any[] = []; // ✅ Always initialize as an empty array
  isEditing: boolean = false;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  async ngOnInit() {
    this.route.queryParams.subscribe(async (params) => {
      if (params['id']) {
        this.isEditing = true;
        await this.loadTaskDetails(params['id']);
      }
    });
  }

  async loadTaskDetails(id: string) {
    try {
      const tasks = await this.apiService.getTasks(); 
      this.tasks = tasks || []; // ✅ Ensure tasks is always an array
      const task = this.tasks.find(t => t.id.toString() === id);

      if (task) {
        this.task = { ...task };
      } else {
        console.warn(`Task with ID ${id} not found`);
      }
    } catch (error) {
      console.error("Error fetching task details", error);
    }
  }

  async saveTask() {  // ✅ Renamed to match template
    if (!this.validateTask()) return;

    try {
      if (this.isEditing) {
        await this.apiService.updateTask(this.task);
      } else {
        await this.apiService.addTask({ ...this.task });
      }

      this.router.navigate(['/todo-list']); // ✅ Redirect after save
    } catch (error) {
      console.error("Error saving task data", error);
    }
  }

  validateTask(): boolean {
    const { name, plannedDate } = this.task;
    if (!name || !plannedDate) {
      alert("All fields are required!");
      return false;
    }
    return true;
  }
}
