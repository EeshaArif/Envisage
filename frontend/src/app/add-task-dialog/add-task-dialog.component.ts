import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css'],
})
export class AddTaskDialogComponent implements OnInit {
  form: any;
  description: string = '';
  start_date: string = '';
  end_date: string = '';
  priority: string = '';
  status: string = '';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.description = data.description;
    this.start_date = data.start_date;
    this.end_date = data.end_date;
    this.priority = data.priority;
    this.status = data.status;
  }
  save(): void {
    this.dialogRef.close(this.form.value);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      description: [this.description, Validators.required],
      start_date: [this.start_date, Validators.required],
      end_date: [this.end_date, Validators.required],
      priority: [this.priority, Validators.required],
      status: [this.status, Validators.required],
    });
  }
}
