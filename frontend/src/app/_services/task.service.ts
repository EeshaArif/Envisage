import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Task } from '../_models/task';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  BASE_URL = `${environment.apiUrl}/tasks`;
  private tasksStore: Task[] = [];
  private taskStore: Task = {
    _id: '',
    description: '',
    start_date: '',
    end_date: '',
    priority: '',
    status: '',
  };
  private tasksSubject: Subject<Task[]> = new Subject();
  private taskSubject: Subject<Task> = new Subject();
  tasks: Observable<Task[]> = this.tasksSubject.asObservable();
  task: Observable<Task> = this.taskSubject.asObservable();
  constructor(private http: HttpClient, private sb: MatSnackBar) {
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.http
      .get<Task[]>(this.BASE_URL)
      .pipe(
        catchError((err) => {
          return this.handleError('Cannot get Tasks');
        })
      )
      .subscribe((tasks) => {
        this.tasksStore = tasks;
        this.tasksSubject.next(this.tasksStore);
      });
  }

  postTask(task: Task): void {
    this.http
      .post(this.BASE_URL, task)
      .pipe(
        catchError((err) => {
          return this.handleError('Cannot add Task');
        })
      )
      .subscribe();
    this.tasksStore.push(task);
    this.tasksSubject.next(this.tasksStore);
  }
  getTask(id: string) {
    this.http
      .get<Task>(`${this.BASE_URL}/${id}`)
      .pipe(
        catchError((err) => {
          return this.handleError('Cannot get specified Task');
        })
      )
      .subscribe((task) => {
        this.taskStore = task;
        this.taskSubject.next(this.taskStore);
      });
  }
  updateTask(id: string, taskData: Task) {
    const index: number = this.tasksStore.findIndex((task) => task._id === id);
    this.http
      .put<Task>(`${this.BASE_URL}/${id}`, taskData)
      .pipe(
        catchError((err) => {
          return this.handleError('Unable to update specified Task');
        })
      )
      .subscribe((task) => {
        this.tasksStore[index] = task;
        this.tasksSubject.next(this.tasksStore);
      });
  }
  deleteTask(id: string) {
    this.http
      .delete(`${this.BASE_URL}/${id}`)
      .pipe(
        catchError((err) => {
          console.log(err);
          return this.handleError('Unable to delete task');
        })
      )
      .subscribe((res) => {
        this.sb.open('Task Deleted!!', 'close', { duration: 5000 });
        this.tasksStore = this.tasksStore.filter((task) => task._id !== id);
        this.tasksSubject.next(this.tasksStore);
      });
  }

  handleError(desc: string) {
    this.sb.open(`${desc}!`, 'close', { duration: 5000 });
    return throwError(desc);
  }
}
