import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { 
    LucideLayoutDashboard, 
    LucideDoorOpen, 
    LucideDynamicIcon, 
    LucideIcon, 
    LucideMap,
    LucideSettings
} from "@lucide/angular";

const ROUTE_ICONS: Record<string, LucideIcon> = {
    'dashboard': LucideLayoutDashboard,
    'rooms': LucideDoorOpen,
    'roadmap': LucideMap,
    'settings': LucideSettings,
};

@Component({
    standalone: true,
    templateUrl: './aside.component.html',
    selector: 'app-aside',
    imports: [
        RouterLink,
        RouterLinkActive,
        LucideDynamicIcon,
    ]
})
export class AsideComponent {
    private router = inject(Router);

    routes = (this.router.config.find(r => r.path === 'company')?.children || [])
        .filter(r => r.data?.['label'])
        .map(r => ({
            ...r,
            icon: ROUTE_ICONS[r.path ?? ''] as LucideIcon
        }));
}