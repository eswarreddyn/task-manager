import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // Import form-related modules
import { TaskService } from '../../services/task.service'; // Import your task service
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { JsonPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from '../../utilities/success-dialog/success-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, JsonPipe],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss'
})
export class CreateTaskComponent implements OnInit, OnDestroy{
  readonly dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(SuccessDialogComponent,{
      data:{
        title:"Success",
        message:`Task has been ${this.updateView ? 'Updated' : 'Created'} Successfully...`
      }
    });
  }
  taskForm: FormGroup;
  selectedPriority: string = "";
  updatetask_path: string = 'updatetask';
  updateView: boolean = false;
  priorities: string[] = ['High', 'Medium', 'Low'];
  activatedRouteService?:Subscription;
  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(32)]],
      description: ['', [Validators.required, Validators.maxLength(64)]],
      priority: ['', Validators.required],
      id:['']
    });
  }

  getPriority() {
    this.taskForm.controls['priority'].setValue(this.selectedPriority);
  };
  onSubmit(): void {
    if(this.updateView){
      this.taskService.updateTask(this.taskForm.value);
    } else{
      this.taskService.addTask(this.taskForm.value);
    }
    this.taskService.getTasks();
    this.openDialog();
    this.gotoListPage();
  }
  getTaskDetails(taskId: number){
    const taskDetails = this.taskService.getTaskDetails(taskId);
    if(taskDetails){
      this.taskForm.patchValue(taskDetails);
    } else{
      this.gotoListPage();
    }
  }
  gotoListPage(){
    this.router.navigate(['./task_list']);
  }
  ngOnInit(): void {
    const current_path = this.activatedRoute.snapshot?.url[0]?.path;
    if(current_path === this.updatetask_path){
      this.updateView = true;
      this.activatedRouteService = this.activatedRoute.paramMap.subscribe((params)=>{
        const taskId = Number(params.get('taskId'));
        this.getTaskDetails(taskId);
      })
    } else {
      this.updateView = false;
    }
  }
  
  ngOnDestroy(): void {
    this.activatedRouteService?.unsubscribe();
  }
}
