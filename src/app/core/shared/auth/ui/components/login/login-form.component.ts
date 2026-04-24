import { Component } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SignIgDto } from "../../../application/dtos/sign-in.dto";
import { AuthStateService } from "../../../state/auth-state.service";
import { SignInUseCase } from "../../../application/use-cases/sign-in.use-case";
import { AuthAdapterService } from "../../../infrastructure/adapters/auth.service";
import { AuthPort } from "../../../application/ports/auth.port";

@Component({
    templateUrl:'./login-form.component.html',
    imports:[ReactiveFormsModule],
    providers:[
        SignInUseCase,
        { provide: AuthPort, useClass: AuthAdapterService },
    ],
    selector: 'app-login-form',
    standalone: true,
})
export class LoginFormComponent{
    constructor(
        private signInUseCase: SignInUseCase,
        private authStateService:AuthStateService
    ){}

    form = new FormGroup({
        password: new FormControl('', { 
            nonNullable: true, 
            validators: [Validators.required, Validators.minLength(3)] 
        }),
        email: new FormControl('', { 
            nonNullable: true, 
            validators: [Validators.required, Validators.email] 
        })
    })
    passwordValue = toSignal(this.form.controls.password.valueChanges)
    emailValue = toSignal(this.form.controls.email.valueChanges)

    
    async onSubmit(){
        if(!this.form.valid) return
        const { email, password } = this.form.getRawValue();

        const dto: SignIgDto = {
            email,    
            password  
        };
        try {
            const response = await this.signInUseCase.execute(dto)
            this.authStateService.setSession(response)
        } catch (error) {
            console.log(error)
        }
    }
}