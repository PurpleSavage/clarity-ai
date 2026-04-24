import { Injectable } from "@angular/core";

import { AuthPort } from "../ports/auth.port";
import { SignIgDto } from "../dtos/sign-in.dto";
import { ContextStorageStrategy, StorageStrategies } from "../../../common/infrastructure/persistence/context-storage-strategy.persistence";

@Injectable()
export class SignInUseCase{
    constructor(
        private authService: AuthPort,
        private contextStorageStrategy:ContextStorageStrategy
    ){}
    async execute(dto:SignIgDto){
        const response = await this.authService.signIn(dto)
        this.contextStorageStrategy
        .use(StorageStrategies.SESSION)
        .set('data_Session',response)
        return response
    }
}