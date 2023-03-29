import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactShowComponent } from './contact-show/contact-show.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'lst', pathMatch: 'full' },
  { path: 'lst', component: ContactListComponent },
  { path: 'ins', component: ContactCreateComponent },
  { path: 'shw/:id', component: ContactShowComponent },
  { path: 'upd/:id', component: ContactUpdateComponent },
  { path: 'del/:id', component: ContactDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
