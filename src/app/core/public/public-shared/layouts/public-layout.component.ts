import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PublicNavbarComponent } from "../components/public-navbar/public-navbar.component";


@Component({
    standalone: true,
    templateUrl:'./public-layout.component.html',
    imports: [
        RouterOutlet,
        PublicNavbarComponent,
    ],
})
export class PublicLayoutComponent{}