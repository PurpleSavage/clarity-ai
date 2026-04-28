import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    templateUrl:'./add-room-form.component.html',
    standalone: true,
    selector: 'app-add-room-form',
    imports:[ReactiveFormsModule]
})
export class AddRoomFormComponent {
    form =  new FormGroup({
        roomName: new FormControl('', { 
            nonNullable: true, 
            validators: [Validators.required] 
        })
    })
}