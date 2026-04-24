import { Component } from "@angular/core";
import { LandingHeroComponent } from "../../components/hero/landing-hero.component";
import { LandingInfoComponent } from "../../components/info/landing-info.component";
import { ValuePropositionComponent } from "../../components/value-proposition/value-proposition.component";
import { OurFeaturesComponent } from "../../components/our-features/our-features.component";
import { ReadyTransformComponent } from "../../components/ready-transform/ready-transform.component";


@Component({
    templateUrl:'./lading-page.component.html',
    standalone:true,
    selector:'app-landing-page',
    imports:[
        LandingHeroComponent,
        LandingInfoComponent,
        ValuePropositionComponent,
        OurFeaturesComponent,
        ReadyTransformComponent
    ]
})
export class LandingPageComponent{}