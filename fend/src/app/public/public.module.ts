import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicHeaderComponent } from './dashboard/public-header/public-header.component';
import { PublicFooterComponent } from './dashboard/public-footer/public-footer.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PublicHeaderComponent,
    PublicFooterComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
