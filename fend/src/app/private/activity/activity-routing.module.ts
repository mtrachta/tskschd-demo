import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityCreateComponent } from './activity-create/activity-create.component';
import { ActivityDeleteComponent } from './activity-delete/activity-delete.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityShowComponent } from './activity-show/activity-show.component';
import { ActivityUpdateComponent } from './activity-update/activity-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'lst', pathMatch: 'full' },
  { path: 'lst', component: ActivityListComponent },
  { path: 'ins', component: ActivityCreateComponent },
  { path: 'shw/:id', component: ActivityShowComponent },
  { path: 'upd/:id', component: ActivityUpdateComponent },
  { path: 'del/:id', component: ActivityDeleteComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
