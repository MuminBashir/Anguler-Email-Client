import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import {SharedRoutingModule} from './shared-routing.module';
import {InputComponent} from './input/input.component';


@NgModule({
  declarations: [
    InputComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ReactiveFormsModule
  ],

  exports: [
    InputComponent
  ]
})
export class SharedModule {
}
