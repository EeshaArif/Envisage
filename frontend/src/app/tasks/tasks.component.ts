import { Task } from './../_models/task';
import { TaskService } from './../_services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(public taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getAllTasks();
  }
  onDelete(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }
}
