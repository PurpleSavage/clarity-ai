import { RoomResponseDto } from "../../application/dtos/responses/room-response.dto";
import { RoomEntity } from "../../domain/entities/room.entity";

export class RoomMapper{
    static toEntity(dto:RoomResponseDto):RoomEntity{
        return{
            id:dto.id,
            topic:dto.topic,
            createdAt:dto.created_at,
            isActive:dto.is_active,
            slug:dto.slug,
            threadsCount: dto.threads[0]?.count ?? 0
        }
    }
}