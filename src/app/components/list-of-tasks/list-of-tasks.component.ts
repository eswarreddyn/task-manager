import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { TaskService, Task } from '../../services/task.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { NoTaskExistComponent } from '../no-task-exist/no-task-exist.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../utilities/success-dialog/success-dialog.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-of-tasks',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule, MatCheckboxModule, FormsModule, ReactiveFormsModule, MatListModule, NoTaskExistComponent, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './list-of-tasks.component.html',
  styleUrl: './list-of-tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListOfTasksComponent implements OnInit {
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(SuccessDialogComponent, {
      data: {
        title: "Success",
        message: "Selected Tasks has been Deleted..."
      }
    });
  }
  tasks: Task[] = []; // Initialize an empty array for tasks
  taskListForm: FormGroup;
  constructor(private taskService: TaskService, private fb: FormBuilder, private router: Router) {
    this.taskListForm = this.fb.group({
      listControl: [''],
    });
  }
  deleteSelected() {
    const selected_tasks = this.taskListForm.controls['listControl'].value;
    this.taskService.deleteTask(selected_tasks);
    this.openDialog();
    this.taskListForm.controls['listControl'].reset();
    this.getTasks();
  }
  getTasks() {
    this.tasks = this.taskService.getTasks();
  }
  viewTask(taskId: number) {
    this.router.navigate(['/updatetask', taskId]);
  }
  ngOnInit(): void {
    this.getTasks();
  }
}
