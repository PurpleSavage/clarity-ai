import { Component, input } from "@angular/core";
import { RoomEntity } from "../../../domain/entities/room.entity";
import { LucideMessageSquare } from "@lucide/angular";

@Component({
    templateUrl:'./room-card.component.html',
    selector:'app-room-card',
    standalone: true,
    imports:[LucideMessageSquare]
})
export class RoomCardComponent {
    room= input<RoomEntity>()
}