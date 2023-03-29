import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteDeleteComponent } from './note-delete/note-delete.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteShowComponent } from './note-show/note-show.component';
import { NoteUpdateComponent } from './note-update/note-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'lst', pathMatch: 'full' },
  { path: 'lst', component: NoteListComponent },
  { path: 'ins', component: NoteCreateComponent },
  { path: 'shw/:id', component: NoteShowComponent },
  { path: 'upd/:id', component: NoteUpdateComponent },
  { path: 'del/:id', component: NoteDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
