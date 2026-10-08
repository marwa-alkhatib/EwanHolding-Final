
import { Routes } from '@angular/router';

import { Companies } from './pages/companies/companies';
import { Dashboard } from './pages/dashboard/dashboard';
import { AddCompany } from './pages/add-company/add-company';
import { Login } from './pages/login/login';
import { NewsAdmin } from './pages/news/news';
import { AddNews } from './pages/add-news/add-news';
import { ContentAdmin } from './pages/content/content';
import { InvestmentsAdmin } from './pages/investments/investments';
import { MessagesAdmin } from './pages/messages/messages';
import { SetupEmail } from './pages/setup-email/setup-email';

import { ChangeTemporaryPassword } from './pages/change-temporary-password/change-temporary-password';

import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: 'setup-email',
    component: SetupEmail,
    canActivate: [authGuard]
  },
  {
    path: 'change-temporary-password',
    component: ChangeTemporaryPassword,
    canActivate: [authGuard]
  },
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard]
  },
  {
    path: 'companies',
    component: Companies,
    canActivate: [authGuard]
  },
  {
    path: 'companies/add',
    component: AddCompany,
    canActivate: [authGuard]
  },
  {
    path: 'companies/edit/:id',
    component: AddCompany,
    canActivate: [authGuard]
  },
  {
    path: 'news',
    component: NewsAdmin,
    canActivate: [authGuard]
  },
  {
    path: 'news/add',
    component: AddNews,
    canActivate: [authGuard]
  },
  {
    path: 'news/edit/:id',
    component: AddNews,
    canActivate: [authGuard]
  },
  {
    path: 'content',
    component: ContentAdmin,
    canActivate: [authGuard]
  },
  {
    path: 'investments',
    component: InvestmentsAdmin,
    canActivate: [authGuard]
  },
  {
    path: 'messages',
    component: MessagesAdmin,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
