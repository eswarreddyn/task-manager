import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-task-exist',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './no-task-exist.component.html',
  styleUrl: './no-task-exist.component.scss'
})
export class NoTaskExistComponent {
  constructor(private taskService: TaskService) {
    this.taskService.checkLocalStorageData();
  }
}
