import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PrivateHeaderComponent } from './dashboard/private-header/private-header.component';
import { PrivateFooterComponent } from './dashboard/private-footer/private-footer.component';
// import { PrivateSidebarComponent } from './dashboard/private-sidebar/private-sidebar.component';
// import { AuthListComponent } from './auth/auth-list/auth-list.component';
// import { AuthCreateComponent } from './auth/auth-create/auth-create.component';
// import { AuthUpdateComponent } from './auth/auth-update/auth-update.component';
// import { AuthDeleteComponent } from './auth/auth-delete/auth-delete.component';
// import { AuthShowComponent } from './auth/auth-show/auth-show.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PrivateHeaderComponent,
    PrivateFooterComponent,
    // PrivateSidebarComponent,
    // AuthListComponent,
    // AuthCreateComponent,
    // AuthUpdateComponent,
    // AuthDeleteComponent,
    // AuthShowComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
