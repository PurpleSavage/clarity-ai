import { Component, effect, inject, signal } from "@angular/core";
import { LucidePlus } from "@lucide/angular";
import { DropdownComponent, DropdownItem } from "../../../../../shared/common/ui/components/dropdown/dropdown.component";
import { GetRoomsUseCase } from "../../../application/use-cases/get-rooms.use-case";
import { RoomsPort } from "../../../application/ports/rooms.port";
import { RoomAdapterService } from "../../../infrastructure/adapters/rooms.service";
import { RoomEntity } from "../../../domain/entities/room.entity";
import { ContextStorageStrategy, StorageStrategies } from "../../../../../shared/common/infrastructure/persistence/context-storage-strategy.persistence";
import { CompanyAccountEntity } from "../../../../../shared/auth/domain/entities/company-account.entity";
import { toast } from "ngx-sonner";
import { AppError } from "../../../../../shared/common/infrastructure/errors/base-error";
import { ModalComponent } from "../../../../../shared/common/ui/components/modal/modal.component";


@Component({
    templateUrl:'./rooms-page.component.html',
    standalone: true,
    imports:[LucidePlus,DropdownComponent, ModalComponent],
    providers:[
        GetRoomsUseCase,
        {provide:RoomsPort, useClass:RoomAdapterService}
    ]
})
export class RoomsPageComponent {
    private getRoomsUseCase = inject(GetRoomsUseCase);
    private storageService = inject(ContextStorageStrategy)
    rooms = signal<RoomEntity[]>([]);
    loading = signal(false);
    statusFilter = signal<boolean | undefined>(undefined);
    isModalOpen = signal(false);

    filterItems: DropdownItem[] = [
        { label: 'Todos', value: 'all' },
        { label: 'Activos', value: 'active', variant: 'success' },
        { label: 'Inactivos', value: 'inactive', variant: 'danger' },
    ];
    constructor() {
        effect(() => {
            this.loadRooms(this.statusFilter());
        });
    }

     onFilter(item: DropdownItem) {
        const value = item.value === 'all' ? undefined : item.value === 'active';
        this.statusFilter.set(value);
    }

    private async loadRooms(isActive?: boolean) {
        this.loading.set(true);
        try {
             const session = this.storageService
            .use(StorageStrategies.SESSION)
            .get<CompanyAccountEntity>('data_Session')
            
            if (!session) {
                toast.error('No hay sesión activa');
                return;
            }

            const rooms = await this.getRoomsUseCase.execute({ 
                companyId: session.id, 
                isActive
             });
            this.rooms.set(rooms);
        } catch (error) {
            if(error instanceof AppError){
                toast.error(error.message);
                return
            }
            toast.error("Error al cargar las rooms");
            console.error(error);
        } finally {
            this.loading.set(false);
        }
    }


    
}