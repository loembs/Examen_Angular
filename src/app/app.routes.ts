import {Routes} from '@angular/router';

import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {AdminComponent} from './pages/admin/admin.component';
import { authGuard } from './shared/guards/auth.guard';
import { ConnexionPageComponent } from './pages/admin/connexion-page/connexion-page.component';
import { ClientListComponent } from './pages/dashboard/client-list/client-list.component';
import { ClientFormComponent } from './pages/dashboard/client-form/client-form.component';
import { DetteListComponent } from './pages/dashboard/dette-list/dette-list.component';
import { DetteFormComponent } from './pages/dashboard/dette-form/dette-form.component';
import { PaiementListComponent } from './pages/dashboard/paiement-list/paiement-list.component';
import { PaiementFormComponent } from './pages/dashboard/paiement-form/paiement-form.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
  {
    path:"dashboard",
    component: DashboardComponent,
    //canActivate: [authGuard],
    children:[
      {
        path: 'clients',
        component: ClientListComponent
      },
      {
        path: 'clients/new',
        component: ClientFormComponent
      },
      {
        path: 'clients/:id/edit',
        component: ClientFormComponent
      },
      {
        path: 'clients/:id/dettes',
        component: DetteListComponent
      },
      {
        path: 'dettes/new',
        component: DetteFormComponent
      },
      {
        path: 'dettes/:id/edit',
        component: DetteFormComponent
      },
      {
        path: 'dettes/:detteId/paiements',
        component: PaiementListComponent
      },
      {
        path: 'paiements/new',
        component: PaiementFormComponent
      },
      {
        path: 'paiements/:id/edit',
        component: PaiementFormComponent
      },
    ]
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [authGuard],
    children: []
  },
  {
    path: 'login',
    component: ConnexionPageComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];