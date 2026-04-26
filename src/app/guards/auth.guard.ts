import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthPort } from '../core/shared/auth/application/ports/auth.port';

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthPort);
    const router = inject(Router);

    const isAuth = await authService.isAuthenticated();

    if (isAuth) {
        return true;
    }

    return router.createUrlTree(['/login']);
};