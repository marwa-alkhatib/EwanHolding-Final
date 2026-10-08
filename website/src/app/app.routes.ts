import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.Home),
  },

  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about').then((m) => m.About),
  },

  {
    path: 'companies',
    loadComponent: () =>
      import('./pages/companies/companies').then((m) => m.Companies),
  },

  // Dynamic company details page
  {
    path: 'companies/:id',
    loadComponent: () =>
      import('./pages/company-details/company-details').then(
        (m) => m.CompanyDetails
      ),
  },

  {
    path: 'investment',
    loadComponent: () =>
      import('./pages/investment/investment').then((m) => m.Investment),
  },

  {
    path: 'news',
    loadComponent: () =>
      import('./pages/news/news').then((m) => m.News),
  },

  {
    path: 'news/:id',
    loadComponent: () =>
      import('./pages/news-details/news-details').then((m) => m.NewsDetails),
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact').then((m) => m.Contact),
  },

  // Old static company pages
  {
    path: 'maintenance-operations',
    loadComponent: () =>
      import('./pages/maintenance-operations/maintenance-operations').then(
        (m) => m.MaintenanceOperations
      ),
  },

  {
    path: 'technical-contracting',
    loadComponent: () =>
      import('./pages/technical-contracting/technical-contracting').then(
        (m) => m.TechnicalContracting
      ),
  },

  {
    path: 'logistics',
    loadComponent: () =>
      import('./pages/logistics/logistics').then((m) => m.Logistics),
  },

  {
    path: 'human-resources',
    loadComponent: () =>
      import('./pages/human-resources/human-resources').then(
        (m) => m.HumanResources
      ),
  },

  {
    path: 'furnished-apartments',
    loadComponent: () =>
      import('./pages/furnished-apartments/furnished-apartments').then(
        (m) => m.FurnishedApartments
      ),
  },

  {
    path: 'security-services',
    loadComponent: () =>
      import('./pages/security-services/security-services').then(
        (m) => m.SecurityServices
      ),
  },

  {
    path: 'terms',
    loadComponent: () =>
      import('./pages/terms/terms').then((m) => m.Terms),
  },
];