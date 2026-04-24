import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LoginFormComponent } from "../components/login/login-form.component";
import { RegisterFormComponent } from "../components/register/register-form.component";
//import { RouterOutlet } from "@angular/router";

@Component({
    templateUrl:'./auth-layout.component.html',
    imports:[
        RouterOutlet,
  
    ],
    selector: 'app-auth-layout',
    standalone: true,
})
export class AuthLayoutComponent{}