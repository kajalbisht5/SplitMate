
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then(m => m.Register)
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(m => m.Dashboard)
  },
  {
    path: 'friends',
    loadComponent: () =>
      import('./pages/friends/friends').then(m => m.Friends)
  },
  {
    path: 'groups',
    loadComponent: () =>
      import('./pages/groups/groups').then(m => m.Groups)
  },
  {
    path: 'expenses',
    loadComponent: () =>
      import('./pages/expenses/expenses').then(m => m.Expenses)
  },
  {
  path: 'settlements',
  loadComponent: () =>
    import('./pages/settlements/settlements').then(m => m.Settlements)
},
{
  path: 'profile',
  loadComponent: () =>
    import('./pages/profile/profile').then(m => m.Profile)
},
{
  path: 'messages',
  loadComponent: () =>
    import('./pages/messages/messages').then(m => m.Messages)
},
{
  path: 'notifications',
  loadComponent: () =>
    import('./pages/notifications/notifications').then(m => m.Notifications)
},
{
  path: 'reports',
  loadComponent: () =>
    import('./pages/reports/reports').then(m => m.Reports)
},

  {
    path: '**',
    redirectTo: 'login'
  }
];
