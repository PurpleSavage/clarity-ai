import { Routes } from '@angular/router';
import { LandingPageComponent } from './core/public/web/ui/pages/lading-page/landing-page.component';
import { PublicLayoutComponent } from './core/public/public-shared/layouts/public-layout.component';
import { AuthLayoutComponent } from './core/shared/auth/ui/layouts/auth-layout.component';

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
                loadComponent:()=>import('./core/public/forum/ui/pages/forum-page.component')
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
    }
];
