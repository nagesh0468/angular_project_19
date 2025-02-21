import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  tasks: any[] = [];
  private apiUrl = 'http://localhost:8800/todo-list';

  constructor(private http: HttpClient, private router: Router) {
    this.fetchTasks();
  }

  fetchTasks() {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (data) => {
        this.tasks = data || [];
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  addNewTask() {
    this.router.navigate(['/add-task']); 
  }

  editTask(task: any) {
    this.router.navigate(['/add-task'], { queryParams: { id: task.id } });
  }

  deleteTask(taskId: number) {
    this.http.delete(`${this.apiUrl}/${taskId}`).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    });
  }
}
