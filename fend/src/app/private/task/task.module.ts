import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskUpdateComponent } from './task-update/task-update.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { TaskShowComponent } from './task-show/task-show.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskCreateComponent,
    TaskUpdateComponent,
    TaskDeleteComponent,
    TaskShowComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatSortModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
