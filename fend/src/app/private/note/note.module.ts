import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteCreateComponent } from './note-create/note-create.component';
import { NoteUpdateComponent } from './note-update/note-update.component';
import { NoteDeleteComponent } from './note-delete/note-delete.component';
import { NoteShowComponent } from './note-show/note-show.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    NoteListComponent,
    NoteCreateComponent,
    NoteUpdateComponent,
    NoteDeleteComponent,
    NoteShowComponent
  ],
  imports: [
    CommonModule,
    CdkTableModule,
    MatSortModule,
    ReactiveFormsModule,
    NoteRoutingModule
  ]
})
export class NoteModule { }
