import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';

import { ListBookComponent } from '../../book-components/list-book/list-book.component';
import { EditCategoryBookComponent } from '../../category-book-components/edit-category-book/edit-category-book.component';
import { EditBookComponent } from '../../book-components/edit-book/edit-book.component';
import { ListCategoryBookComponent } from '../../category-book-components/list-category-book/list-category-book.component';
import { ListAuthorComponent } from '../../author-components/list-author/list-author.component';
import { ListPublisherComponent } from '../../publisher-components/list-publisher/list-publisher.component';




export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'category-book-management',   component:ListCategoryBookComponent},
    {path:'author-management',component:ListAuthorComponent},
    {path:'publisher-management',component:ListPublisherComponent},
    {path:'publisher-management',component:ListPublisherComponent},
    {path:'book-management',component:ListBookComponent},
    {path:'edit-book',component:EditBookComponent},
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
   
   
    // { path: 'author-management',     component: AuthorManagementComponent },
    // { path: 'publisher-management',     component: PublisherManagementComponent},
    // { path: 'book-management',          component: BookManagementComponent },
    // { path: 'logout',           component: MapsComponent },
    // { path: 'notifications',  component: NotificationsComponent },
    // { path: 'upgrade',        component: UpgradeComponent },
];
