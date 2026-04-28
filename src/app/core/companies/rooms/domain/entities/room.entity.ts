export interface RoomEntity{
    id:string
    topic:string,
    createdAt:Date,
    isActive:boolean,
    slug:string
    threadsCount: number;
}