import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';
import { AuthPort } from '../core/shared/auth/application/ports/auth.port';
import { AuthStateService } from '../core/shared/auth/state/auth-state.service';

export const authGuard: CanActivateFn = async (route, state) => {
    const authService = inject(AuthPort);
    const authState = inject(AuthStateService);
    const router = inject(Router);
    
    if (authState.session()) {
        return true;
    }
    // 1. Verificamos sesión en Supabase
    const isAuth = await authService.isAuthenticated();

    if (isAuth) {
        // 2. Si hay sesión pero el Signal está vacío (pasó un F5)
        // Recuperamos el perfil y actualizamos el estado global
        if (!authState.session()) {
            try {
                const profile = await authService.getProfile();
                authState.setSession(profile);
            } catch (error) {
                // Si falla al obtener perfil, mejor mandarlo al login
                return router.createUrlTree(['/auth/login']);
            }
        }
        return true;
    }

    // 3. No está autenticado
    return router.createUrlTree(['/auth/login']);
};