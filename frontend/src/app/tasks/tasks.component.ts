import { Task, TaskData } from './../_models/task';
import { TaskService } from './../_services/task.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(public taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService.getAllTasks();
  }
  onDelete(taskId: string): void {
    this.taskService.deleteTask(taskId);
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      form_title: 'Add Task',
    };
    const dialogRef = this.dialog.open(AddTaskDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data: TaskData) => {
      this.taskService.postTask({
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date,
        priority: data.priority,
        status: data.status,
      });
    });
  }
}
