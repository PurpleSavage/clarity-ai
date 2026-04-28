import { Injectable } from "@angular/core";
import { RoomsPort } from "../../application/ports/rooms.port";
import { RoomEntity } from "../../domain/entities/room.entity";
import { SupabaseClient } from "@supabase/supabase-js";
import { GetRoomsRequestDto } from "../../application/dtos/request/get-rooms.dto";
import { RoomResponseDto } from "../../application/dtos/responses/room-response.dto";
import { AppError, ErrorType } from "../../../../shared/common/infrastructure/errors/base-error";
import { RoomMapper } from "../mappers/room.mapper";

@Injectable()
export class RoomAdapterService implements RoomsPort{
    constructor(
        private supabase: SupabaseClient
    ) {}
    async getRooms(dto:GetRoomsRequestDto): Promise<RoomEntity[]> {
        const { companyId, isActive } = dto;

        let query = this.supabase
            .from('rooms')
            .select<string, RoomResponseDto>('id, topic, created_at, is_active, slug, threads(count)')
            .eq('company_id', companyId);

        if (isActive !== undefined) {
            query = query.eq('is_active', isActive);
        }

        const { data, error } = await query;

        if (error) {
            throw new AppError(
                'Ocurrió un error al obtener las salas. Por favor intenta de nuevo.',
                'Error al cargar salas',
                ErrorType.DATABASE
            );
        }
        const response = data ?? []
        return response.map((room)=>RoomMapper.toEntity(room))
    }
}