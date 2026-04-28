export interface RoomResponseDto{
    id:string
    topic:string,
    created_at:Date,
    is_active:boolean,
    slug:string,
    threads: [{ count: number }];
}