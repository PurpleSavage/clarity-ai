import { Injectable } from "@angular/core";
import { AuthPort } from "../../application/ports/auth.port";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { CompanyAccountEntity } from "../../domain/entities/company-account.entity";
import { SignIgDto } from "../../application/dtos/sign-in.dto";
import { CompannyMapper } from "../mappers/companny.mapper";
import { SignUpDto } from "../../application/dtos/sign-up.dto";
import { Observable } from "rxjs";
import { AppError, ErrorType } from "../../../common/infrastructure/errors/base-error";

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

        if (error) {
            throw new AppError(
                error.message, 
                'Error de Inicio de Sesión', 
                ErrorType.AUTH
            );
        }

        if (!data.user) {
            throw new AppError(
                'No se pudo obtener la información del usuario.', 
                'Usuario no encontrado', 
                ErrorType.AUTH
            );
        }
        return CompannyMapper.mapToEntity(data.user);
        
    }

    async signUp(dto: SignUpDto): Promise<CompanyAccountEntity> {
        const { data, error } = await this.supabase.auth.signUp({
            email: dto.email,
            password: dto.password,
            options: {
                data: {
                    company_name: dto.companyName, 
                    address: dto.address,
                    industry: dto.industry,
                    phone: dto.phone,
                    description: dto.description   
                }
            }
        });

        if (error) {
            throw new AppError(
                error.message, 
                'Error de Registro', 
                ErrorType.AUTH
            );
        }

        // Caso de seguridad por si Supabase no devuelve el objeto user
        if (!data.user) {
            throw new AppError(
                'No se pudo completar el registro. Inténtalo de nuevo más tarde.', 
                'Error al crear la cuenta', 
                ErrorType.AUTH
            );
        }
        
        return CompannyMapper.mapToEntity(data.user);
    }

    async signOut(): Promise<void> {
        const { error } = await this.supabase.auth.signOut();

        if (error) {
            throw new AppError(
                error.message, 
                'Error al Cerrar Sesión', 
                ErrorType.AUTH
            );
        }
    }
    async getProfile(): Promise<CompanyAccountEntity> {
        const { data: { user }, error } = await this.supabase.auth.getUser();

        if (error || !user) {
        throw new AppError(
            'Tu sesión ha expirado o es inválida.', 
            'Sesión Inválida', 
            ErrorType.AUTH
        );
        }

        return CompannyMapper.mapToEntity(user);
    }


    async isAuthenticated(): Promise<boolean> {
        try {
            const { data: { session } } = await this.supabase.auth.getSession();
            return !!session;
        } catch {
            return false;
        }
    }


    sessionState$(): Observable<Session | null> {
        return new Observable(observer => {
            this.supabase.auth.getSession().then(({ data: { session } }) => {
                observer.next(session);
            });
            const { data: { subscription } } = this.supabase.auth.onAuthStateChange((event, session) => {
                observer.next(session);
            });

            return () => subscription.unsubscribe();
        });
    }
}