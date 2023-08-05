import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToDoRoutingModule } from './to-do-routing.module';
import { ToDoComponent } from './to-do.component';

import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from '../../../app-material/app-material.module';

@NgModule({
  declarations: [
    ToDoComponent,
  ],
  imports: [
    CommonModule,
    ToDoRoutingModule,
    AppMaterialModule,
    FormsModule
  ]
})
export class ToDoModule { }
