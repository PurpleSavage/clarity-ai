import { CommonModule } from "@angular/common";
import { Component, computed, input } from "@angular/core";

@Component({
    templateUrl:'./loader.component.html',
    selector: 'app-loader',
    standalone: true,
    imports: [CommonModule],
})
export class LoaderComponent {
    size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    color = input<string>('text-emerald-500')
    
    private sizeMap = {
        xs: 'w-4 h-4 border-2',
        sm: 'w-6 h-6 border-2',
        md: 'w-10 h-10 border-[3px]',
        lg: 'w-16 h-16 border-4',
        xl: 'w-24 h-24 border-[6px]'
    }

    loaderClasses = computed(() => {
        const sizeClass = this.sizeMap[this.size()];
        return `${sizeClass} ${this.color()} animate-spin rounded-full border-t-transparent border-current`;
    });
}