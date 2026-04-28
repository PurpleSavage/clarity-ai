import { Component, input, output, signal } from "@angular/core";
import { LucideChevronDown } from "@lucide/angular";


export interface DropdownItem {
    label: string;
    value: string;
    variant?: 'default' | 'success' | 'danger';
}
@Component({
    templateUrl: "./dropdown.component.html",
    standalone: true,
    selector: "app-dropdown",
    imports: [LucideChevronDown],
})
export class DropdownComponent {
    items = input.required<DropdownItem[]>();
    placeholder = input<string>('Filtrar');
    selected = output<DropdownItem>();
    
    isOpen = signal(false);
    selectedItem = signal<DropdownItem | null>(null);

    select(item: DropdownItem) {
        this.selectedItem.set(item);
        this.selected.emit(item);
        this.isOpen.set(false);
    }
}