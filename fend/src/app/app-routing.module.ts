import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './_shared/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'pbl', pathMatch: 'full'},
  { path: 'pbl', loadChildren: () => import('./public/public.module').then(m => m.PublicModule) },
  { path: 'prv', loadChildren: () => import('./private/private.module').then(m => m.PrivateModule) },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
