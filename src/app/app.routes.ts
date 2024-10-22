import { Routes } from '@angular/router';
import { ListOfTasksComponent } from './components/list-of-tasks/list-of-tasks.component';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { NoTaskExistComponent } from './components/no-task-exist/no-task-exist.component';

export const routes: Routes = [
    {
        path: 'home',
        component: NoTaskExistComponent
    },
    {
        path: 'task_list',
        component: ListOfTasksComponent
    },
    {
        path: 'create_task',
        component: CreateTaskComponent
    },
    {
        path: 'updatetask/:taskId',
        component: CreateTaskComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full' 
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
