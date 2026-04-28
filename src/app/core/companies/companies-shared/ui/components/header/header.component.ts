import { Component, computed, inject} from "@angular/core";
import { LucideUser,LucideBell} from '@lucide/angular';
import { AuthStateService } from "../../../../../shared/auth/state/auth-state.service";
import { toSignal } from "@angular/core/rxjs-interop";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs";
@Component({
    templateUrl: './header.component.html',
    standalone: true,
    selector: 'app-companies-header',
    imports: [LucideUser,LucideBell]
})
export class HeaderComponent {
    authStateService = inject(AuthStateService)
    private router = inject(Router);


    userSummary = computed(() => {
        const session = this.authStateService.session();
        return {
            name: session?.companyName || 'Desconocido',
            email: session?.email || ''
        };
    });

    currentRoute = toSignal(
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd),
            map(e => (e as NavigationEnd).urlAfterRedirects),
            map(url => url.split('/').slice(2, 4).join('->'))
        )
    );

}