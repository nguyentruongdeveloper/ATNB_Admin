import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './service/user.service';
import { ShareDataUserService } from './service/share-data-user.service';
import { ShareService } from './service/shareservice';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';






@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot( {timeOut: 1500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,}),
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
  
   
    
  


  ],
  providers: [UserService,ShareDataUserService,ShareService],
  bootstrap: [AppComponent]
})
export class AppModule { }
