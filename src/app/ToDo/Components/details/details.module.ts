import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from '../../../app-material/app-material.module';

@NgModule({
  declarations: [
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    DetailsRoutingModule,
    FormsModule,
    AppMaterialModule
  ]
})
export class DetailsModule { }
