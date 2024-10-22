import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];
  constructor(private router: Router) {
    this.checkLocalStorageData();
  }
  checkLocalStorageData() {
    const todoKeyData = this.getTasksFromStorage();
    if (todoKeyData && todoKeyData.length>0) {
        this.tasks = todoKeyData;
        this.router.navigate(['/task_list']);
    } else {
      this.tasks = [];
      this.router.navigate(['/home']);
    }
  }

  getTasks(): Task[] {
    const storageData = this.getTasksFromStorage();
    if(storageData && storageData.length>0){
      this.tasks = storageData;
    } else {
      this.tasks = [];
    }
    return this.tasks;
  }
  getTasksFromStorage(){
    const todoKeyData = localStorage.getItem('todoData');
    if (todoKeyData) {
      const todoKeyDataValue = JSON.parse(todoKeyData);
      if (todoKeyDataValue && Array.isArray(todoKeyDataValue) && todoKeyDataValue.length > 0) {
        return todoKeyDataValue;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  getTaskDetails(taskId: number): any {
    return this.tasks.find(task => task.id === taskId);
  }

  addTask(task: Task) {
    task.id = Date.now();
    this.tasks.push(task);
    localStorage.setItem('todoData', JSON.stringify(this.tasks));
  }

  updateTask(modifiedTask: Task): void {
    const changedTasks = this.tasks.map(task => task.id === modifiedTask.id ? modifiedTask : task);
    if (changedTasks) {
      localStorage.setItem('todoData', JSON.stringify(changedTasks));
    } else {
      this.addTask(modifiedTask);
    }
    this.getTasks();
  }

  deleteTask(arrOfTaskIds: number[]): void {
    this.tasks = this.tasks.filter(task => !arrOfTaskIds.includes(task.id));
    localStorage.setItem('todoData', JSON.stringify(this.tasks));
  }
}

// task.model.ts
export interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  completed?: boolean;
}
