import { Observable } from "rxjs";
import { CompanyAccountEntity } from "../../domain/entities/company-account.entity";
import { SignIgDto } from "../dtos/sign-in.dto";
import { SignUpDto } from "../dtos/sign-up.dto";
import { Session } from "@supabase/supabase-js";

export abstract class AuthPort {
    abstract signIn(dto:SignIgDto):Promise<CompanyAccountEntity>
    abstract signUp(dto:SignUpDto):Promise<CompanyAccountEntity>
    abstract signOut():Promise<void>
    abstract getProfile():Promise<CompanyAccountEntity>

    abstract isAuthenticated(): Promise<boolean>
    abstract sessionState$(): Observable<Session | null>
} 