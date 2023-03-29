import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskShowComponent } from './task-show/task-show.component';
import { TaskUpdateComponent } from './task-update/task-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'lst', pathMatch: 'full' },
  { path: 'lst', component: TaskListComponent },
  { path: 'ins', component: TaskCreateComponent },
  { path: 'shw/:id', component: TaskShowComponent },
  { path: 'upd/:id', component: TaskUpdateComponent },
  { path: 'del/:id', component: TaskDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
