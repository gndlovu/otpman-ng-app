import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ControlMessagesComponent } from './control-messages.component';

@NgModule({
  declarations: [
    ControlMessagesComponent
  ],
  imports: [CommonModule],
  exports: [ControlMessagesComponent]
})
export class ControlMessagesModule { }
