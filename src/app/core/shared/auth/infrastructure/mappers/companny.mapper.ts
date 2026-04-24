import { Session, User, WeakPassword } from "@supabase/supabase-js";
import { CompanyAccountEntity } from "../../domain/entities/company-account.entity";
import { DateFormatter } from "../../../common/ui/utils/date-formatter.util";

export class CompannyMapper{
    static mapToEntity(user: User): CompanyAccountEntity{
        return {
            id: user.id,
            email: user.email || '',
            companyName: user.user_metadata?.['company_name'] || 'Sin nombre',
            
            
            industry: user.user_metadata?.['industry'] || 'Sin rubro',
            phone: user.user_metadata?.['phone'] || 'Sin teléfono',
           

            address: user.user_metadata?.['address'] || 'Sin dirección',
            createdAt: DateFormatter.toISODate(user.created_at),
            description: user.user_metadata?.['description']
        }
    }
}