import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient } from '@supabase/supabase-js';

export const authGuard = async () => {
  const supabase = inject(SupabaseClient);
  const router = inject(Router);

  // Verificamos la sesión actual
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    return true; // Hay sesión, adelante
  }

  // No hay sesión, mandamos al login
  return router.parseUrl('/login');
};