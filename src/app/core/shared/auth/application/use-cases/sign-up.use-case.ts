import { Injectable } from "@angular/core";
import { AuthPort } from "../ports/auth.port";
import { SignUpDto } from "../dtos/sign-up.dto";
import { ContextStorageStrategy, StorageStrategies } from "../../../common/infrastructure/persistence/context-storage-strategy.persistence";

@Injectable()
export class SignUpUseCase{
    constructor(
        private authService: AuthPort,
        private contextStorageStrategy:ContextStorageStrategy
    ){}
    async execute(dto:SignUpDto){
        const response =await this.authService.signUp(dto)
        this.contextStorageStrategy
        .use(StorageStrategies.SESSION)
        .set('data_Session',response)
        return response
    }
}