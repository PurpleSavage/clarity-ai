import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { AuthPort } from './core/shared/auth/application/ports/auth.port';
import { AuthAdapterService } from './core/shared/auth/infrastructure/adapters/auth.service';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    {
      provide: SupabaseClient,
      useFactory: () => createClient(environment.supabaseUrl, environment.supabaseKey)
    },
    {
      provide: AuthPort,        
      useClass: AuthAdapterService 
    },
  
  ]
};
