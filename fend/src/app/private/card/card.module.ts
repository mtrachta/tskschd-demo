import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardListComponent } from './card-list/card-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CardListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardRoutingModule
  ]
})
export class CardModule { }
