import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgxSonnerToaster } from 'ngx-sonner';
import { HeaderComponent } from "../components/header/header.component";
import { AsideComponent } from "../components/aside/aside.component";
@Component({
    standalone: true,
    imports: [
        RouterOutlet, 
        NgxSonnerToaster,
        HeaderComponent,
        AsideComponent
    ],
    templateUrl: './companies-layout.component.html',
})
export class CompaniesLayoutComponent {}