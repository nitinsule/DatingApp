import { Routes } from '@angular/router';
import { HomeComponent } from '../app/home/home.component';
import { MemberListComponent } from '../app/members/member-list/member-list.component';
import { MessagesComponent } from '../app/messages/messages.component';
import { ListsComponent } from '../app/lists/lists.component';
import { AuthGuard } from '../app/_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolver/member-detail.resolver';
import { MemberListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolver/member-edit.resolve';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'members', component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: 'members/:id', component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      { path: 'member/edit', component: MemberEditComponent,
        resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChangesGuard] },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
