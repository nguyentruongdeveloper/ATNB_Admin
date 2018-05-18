import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpClient, HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ButtonsModule } from '@progress/kendo-angular-buttons';





import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
} from '@angular/material';

import { EditService } from '../../service/edit.service';
import { EditBookComponent } from '../../book-components/edit-book/edit-book.component';
import { ListBookComponent } from '../../book-components/list-book/list-book.component';
import { ListCategoryBookComponent } from '../../category-book-components/list-category-book/list-category-book.component';
import { EditCategoryBookComponent } from '../../category-book-components/edit-category-book/edit-category-book.component';
import { ListAuthorComponent } from '../../author-components/list-author/list-author.component';
import { EditAuthorComponent } from '../../author-components/edit-author/edit-author.component';
import { ListPublisherComponent } from '../../publisher-components/list-publisher/list-publisher.component';
import { EditPublisherComponent } from '../../publisher-components/edit-publisher/edit-publisher.component';
import { CategoryService } from '../../service/category.service';
import { AuthorService } from '../../service/author.service';
import { PublisherService } from '../../service/publisher.service';
import { BookService } from '../../service/book.service';
import { ShareService } from '../../service/shareservice';
import { StatusbookService } from '../../service/statusbook.service';
import { SharedataService } from '../../service/sharedata.service';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    DialogsModule,
    GridModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    DropDownsModule,
    InputsModule,
    UploadModule,
    ButtonsModule,
    DropDownsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    ListBookComponent,
    EditBookComponent,
    ListCategoryBookComponent,
    EditCategoryBookComponent,
    ListAuthorComponent,
    EditAuthorComponent,
    ListPublisherComponent,
    EditPublisherComponent



  ],
  providers:
   [
    {
      deps: [HttpClient],
      provide: EditService,

     
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
    },
    CategoryService,
    AuthorService,
    PublisherService,
    BookService,
    StatusbookService,
    ShareService,
    SharedataService
   
 

  ]
})

export class AdminLayoutModule { }
