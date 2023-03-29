import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignoutComponent } from '../public/auth/signout/signout.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'crd', pathMatch: 'full' },
      { path: 'crd', loadChildren: () => import('./card/card.module').then(m => m.CardModule) },
      { path: 'act', loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule) },
      { path: 'cnt', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
      { path: 'not', loadChildren: () => import('./note/note.module').then(m => m.NoteModule) },
      { path: 'tsk', loadChildren: () => import('./task/task.module').then(m => m.TaskModule) },
      { path: 'logout', component: SignoutComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
