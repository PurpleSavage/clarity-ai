import { Component, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { SignIgDto } from "../../../application/dtos/sign-in.dto";
import { AuthStateService } from "../../../state/auth-state.service";
import { SignInUseCase } from "../../../application/use-cases/sign-in.use-case";
import { AuthAdapterService } from "../../../infrastructure/adapters/auth.service";
import { AuthPort } from "../../../application/ports/auth.port";
import { AppError } from "../../../../common/infrastructure/errors/base-error";
import { Router, RouterLink } from "@angular/router";

@Component({
    templateUrl:'./login-form.component.html',
    imports:[ReactiveFormsModule,RouterLink],
    providers:[
        SignInUseCase,
        { provide: AuthPort, useClass: AuthAdapterService },
    ],
    selector: 'app-login-form',
    standalone: true,
})
export class LoginFormComponent{
    private signInUseCase = inject(SignInUseCase)
    private authStateService = inject(AuthStateService)
    private router = inject(Router)


    errorMessage=signal<string>('')
    isPendingLogin = signal(false)
    form = new FormGroup({
        password: new FormControl('', { 
            nonNullable: true, 
            validators: [Validators.required, Validators.minLength(8)] 
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
            this.isPendingLogin.set(true)
            const response = await this.signInUseCase.execute(dto)
            this.authStateService.setSession(response)
            this.router.navigate(['/company/dashboard'])
            
        } catch (error) {
            if(error instanceof AppError) {
                this.errorMessage.set(error.message)
                return
            }
            this.errorMessage.set('Error desconocido al intentar iniciar sesión. Por favor, inténtalo de nuevo.')
        }finally{
            this.isPendingLogin.set(false)
        }
    }
}