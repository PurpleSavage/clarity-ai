import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { SignUpDto } from "../../../application/dtos/sign-up.dto";
import { AuthAdapterService } from "../../../infrastructure/adapters/auth.service";
import { AuthPort } from "../../../application/ports/auth.port";
import { SignUpUseCase } from "../../../application/use-cases/sign-up.use-case";
import { AuthStateService } from "../../../state/auth-state.service";


@Component({
    templateUrl:'./register-form.component.html',
    standalone: true,
    imports: [ReactiveFormsModule],
    providers:[
        SignUpUseCase,
        { provide: AuthPort, useClass: AuthAdapterService },
    ]
})
export class RegisterFormComponent{
    constructor(
        private signUpUseCase: SignUpUseCase,
        private authStateService:AuthStateService
    ){}
    currentStep = signal(1)
    form = new FormGroup({
            // Paso 1: Cuenta
            email: new FormControl('', {
                validators:[Validators.required, Validators.email],
                nonNullable:true
            }),
            password: new FormControl('', {
                validators:[Validators.required, Validators.minLength(6)],
                nonNullable:true
            }),
            
            // Paso 2: Detalles de Empresa
            company_name: new FormControl('', {
                validators:[Validators.required],
                nonNullable:true
            }),
            industry: new FormControl('',{
                validators:[Validators.required],
                 nonNullable:true
            }),
            
            // Paso 3: Contacto
            phone: new FormControl('',{
                validators:[Validators.required],
                nonNullable:true
            }),
            address: new FormControl('',{
                validators:[Validators.required],
                nonNullable:true
            }),
            description: new FormControl('')
    })

    nextStep() {
        if (this.currentStep() < 3) {
            this.currentStep.update(s => s + 1);
        }
    }

    prevStep() {
        if (this.currentStep() > 1) {
            this.currentStep.update(s => s - 1);
        }
    }

    async onSubmit() {
        if (!this.form.valid) return
        const formData = this.form.getRawValue()
        const dto:SignUpDto ={
            email:formData.email,
            password:formData.password,
            address:formData.address,
            companyName:formData.company_name,
            industry:formData.industry,
            phone:formData.phone,
            
        }
        if(formData.description){
            dto['description']=formData.description
        }
        try {
            const response = await this.signUpUseCase.execute(dto)
            this.authStateService.setSession(response)
        } catch (error) {
             console.log(error)
        }
           
    }
}