import { Component } from "@angular/core";
 import { NgxTimelineComponent, NgxTimelineEntryComponent } from '@omnedia/ngx-timeline';

@Component({
    templateUrl:'./our-features.component.html',
    styleUrl: './our-features.component.css',
    standalone:true,
    selector:'app-our-features',
    imports: [NgxTimelineComponent, NgxTimelineEntryComponent]
})
export class OurFeaturesComponent{

}