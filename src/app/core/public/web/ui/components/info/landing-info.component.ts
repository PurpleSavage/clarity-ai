import { Component } from "@angular/core";
import { LucideQrCode,LucideMic,LucideMessageSquareQuote} from '@lucide/angular';
@Component({
    templateUrl:'./landing-info.component.html',
    selector:'app-landing-info',
    standalone:true,
    imports:[LucideQrCode,LucideMic,LucideMessageSquareQuote]
})
export class LandingInfoComponent{}