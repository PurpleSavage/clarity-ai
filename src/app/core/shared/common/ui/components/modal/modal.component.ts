import { Component, input, output } from "@angular/core";
import { OverlayModule } from "@angular/cdk/overlay";
import { LucideX } from "@lucide/angular";

@Component({
    selector: "app-modal",
    standalone: true,
    imports: [OverlayModule, LucideX],
    templateUrl: "./modal.component.html"
})
export class ModalComponent {
    title = input.required<string>();
    isOpen = input.required<boolean>();
    closed = output<void>();

    close() {
        this.closed.emit();
    }
}