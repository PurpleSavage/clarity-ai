import { Injectable, signal } from "@angular/core";
import { CompanyAccountEntity } from "../domain/entities/company-account.entity";

@Injectable({
    providedIn: 'root'
})
export class AuthStateService{
    session = signal<CompanyAccountEntity | null>(null)

    setSession(session:CompanyAccountEntity){
        this.session.set(session)
    }
    
    getSession(){
        return this.session()
    }
}