import { Injectable } from "@angular/core";
import { AuthPort } from "../../application/ports/auth.port";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { CompanyAccountEntity } from "../../domain/entities/company-account.entity";
import { SignIgDto } from "../../application/dtos/sign-in.dto";
import { CompannyMapper } from "../mappers/companny.mapper";
import { SignUpDto } from "../../application/dtos/sign-up.dto";
import { Observable } from "rxjs";

@Injectable()
export class AuthAdapterService implements AuthPort{

    constructor(
        private supabase: SupabaseClient
    ) {}

    
    async signIn(dto:SignIgDto): Promise<CompanyAccountEntity> {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: dto.email,
            password: dto.password,
        });

        if (error) throw new Error(error.message);
        if (!data.user) throw new Error('No se encontró el usuario');
        return CompannyMapper.mapToEntity(data.user)
    }

    async signUp(dto:SignUpDto): Promise<CompanyAccountEntity> {
        const { data, error } = await this.supabase.auth.signUp({
            email: dto.email,
            password: dto.password,
            options: {
                data: {
                    company_name: dto.companyName, 
                    address: dto.address   
                }
            }
        });

        if (error) throw new Error(error.message);
        if (!data.user) throw new Error('Error al crear la cuenta');
        
        return CompannyMapper.mapToEntity(data.user);
    }

    async signOut(): Promise<void> {
        const { error } = await this.supabase.auth.signOut();
        if (error) throw new Error(error.message);
    }

    async getProfile(): Promise<CompanyAccountEntity> {
        const { data: { user }, error } = await this.supabase.auth.getUser();

        if (error || !user) {
            throw new Error('No hay una sesión activa o el perfil no existe');
        }

        return CompannyMapper.mapToEntity(user);
    }


    async isAuthenticated(): Promise<boolean> {
        const { data: { session } } = await this.supabase.auth.getSession();
        return !!session;
    }


    sessionState$(): Observable<Session | null> {
        return new Observable(observer => {
            const { data: { subscription } } = this.supabase.auth.onAuthStateChange((event, session) => {
                observer.next(session);
            });
            return () => subscription.unsubscribe();
        });
    }
}