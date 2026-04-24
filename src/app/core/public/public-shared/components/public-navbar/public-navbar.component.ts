import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    standalone:true,
    selector:'app-public-navbar',
    templateUrl:'./public-navbar.component.html',
    imports:[
        RouterLink,
        RouterLinkActive
    ]
})
export class PublicNavbarComponent{}