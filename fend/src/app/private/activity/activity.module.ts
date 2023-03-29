import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityUpdateComponent } from './activity-update/activity-update.component';
import { ActivityDeleteComponent } from './activity-delete/activity-delete.component';
import { ActivityShowComponent } from './activity-show/activity-show.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    ActivityListComponent,
    ActivityCreateComponent,
    ActivityUpdateComponent,
    ActivityDeleteComponent,
    ActivityShowComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatSortModule,
    ActivityRoutingModule
  ]
})
export class ActivityModule { }
