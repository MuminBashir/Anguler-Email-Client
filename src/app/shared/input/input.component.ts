import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  @Input() label = ""
  @Input() control!: FormControl | any
  @Input() inputType = "text"
  @Input() controlType = "input"

  showError() {
    const {errors, dirty, touched} = this.control
    return errors && touched && dirty
  }
}
