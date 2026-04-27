import { Component, computed, Inject } from "@angular/core";
import { LucideUser,LucideBell} from '@lucide/angular';
import { AuthStateService } from "../../../../../shared/auth/state/auth-state.service";
@Component({
    templateUrl: './header.component.html',
    standalone: true,
    selector: 'app-companies-header',
    imports: [LucideUser,LucideBell]
})
export class HeaderComponent {
    authStateService = Inject(AuthStateService)
    userSummary = computed(() => {
        const session = this.authStateService.session();
        return {
            name: session?.companyName || 'Desconocido',
            email: session?.email || ''
        };
    });

}