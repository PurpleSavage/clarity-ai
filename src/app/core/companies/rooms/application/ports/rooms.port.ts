import { RoomEntity } from "../../domain/entities/room.entity";
import { GetRoomsRequestDto } from "../dtos/request/get-rooms.dto";

export abstract class RoomsPort {
    abstract getRooms(dto:GetRoomsRequestDto): Promise<RoomEntity[]>;
}