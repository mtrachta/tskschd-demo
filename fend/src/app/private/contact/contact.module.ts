import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactCreateComponent } from './contact-create/contact-create.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';
import { ContactShowComponent } from './contact-show/contact-show.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [
    ContactListComponent,
    ContactCreateComponent,
    ContactUpdateComponent,
    ContactDeleteComponent,
    ContactShowComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkTableModule,
    MatSortModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
