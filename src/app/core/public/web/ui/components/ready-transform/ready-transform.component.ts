import { Component } from "@angular/core";
import { NgxSpotlightComponent } from '@omnedia/ngx-spotlight';
import {NgxGridpatternComponent} from '@omnedia/ngx-gridpattern'
@Component({
    templateUrl:'./ready-transform.component.html',
    styleUrl:'./ready-transform.component.css',
    standalone:true,
    imports:[NgxSpotlightComponent,NgxGridpatternComponent],
    selector:'app-ready-transform'
})
export class ReadyTransformComponent{}