import { Routes } from '@angular/router';

import { PublicLayoutComponent } from './public/public-shared/layouts/public-layout.component';
import { AuthLayoutComponent } from './core/shared/auth/ui/layouts/auth-layout.component';
import { LandingPageComponent } from './public/web/ui/pages/lading-page/landing-page.component';
import { CompaniesLayoutComponent } from './core/companies/companies-shared/ui/layouts/companies-layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'',
        component:PublicLayoutComponent,
        children:[
            {
                path:'',
                component:LandingPageComponent
            },
            {
                path:'forum',
                loadComponent:()=>import('./core/forum/ui/pages/forum-page/forum-page.component')
                .then(fp=>fp.ForumPageComponent)
            }
        ]
    },
    {
        path:'auth',
        component:AuthLayoutComponent,
        children:[
            {
                path:'login',
                loadComponent:()=>import('./core/shared/auth/ui/components/login/login-form.component')
                .then(lf=>lf.LoginFormComponent)
            },
            {
                path:'register',
                loadComponent:()=>import('./core/shared/auth/ui/components/register/register-form.component')
                .then(rf=>rf.RegisterFormComponent)
            }
        ]
    },
    {
        path:'company',
        component:CompaniesLayoutComponent,
        canActivate: [authGuard],
        canActivateChild: [authGuard],
        children: [
            {
                path: 'dashboard',
                data: { label: 'Dashboard', icon: 'layout-dashboard' },
                loadComponent: () => import('./core/companies/dashboards/ui/pages/dashboard-page/dashboard-page.component')
                    .then(dp => dp.DashboardPageComponent)
            },
            {
                path: 'rooms',
                data: { label: 'Rooms', icon: 'door-open' },
                loadComponent: () => import('./core/companies/rooms/ui/pages/rooms-page/rooms-page.component')
                    .then(rp => rp.RoomsPageComponent)
            },
            {
                path:'roadmap',
                data: { label: 'Roadmap', icon: 'road' },
                loadComponent: () => import('./core/companies/road-maps/ui/pages/road-maps-page/road-maps-page.component')
                    .then(rmp => rmp.RoadMapsPageComponent)
            },
            {
                path:'settings',
                data: { label: 'Settings', icon: 'settings' },
                loadComponent: () => import('./core/companies/settings/ui/pages/settings-page/settings-page.component')
                    .then(csp => csp.SettingsPageComponent)
            }
        ]
    }
];
