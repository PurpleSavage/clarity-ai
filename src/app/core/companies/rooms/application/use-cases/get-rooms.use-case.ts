import { Injectable } from "@angular/core";
import { RoomsPort } from "../ports/rooms.port";
import { GetRoomsRequestDto } from "../dtos/request/get-rooms.dto";

@Injectable()
export class GetRoomsUseCase{
    constructor(
        private roomsService:RoomsPort
    ){}
    execute(dto:GetRoomsRequestDto){
        return this.roomsService.getRooms(dto)
    }
}