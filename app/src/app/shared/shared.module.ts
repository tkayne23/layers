import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from 'clarity-angular';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    ClarityModule,
    // ClarityModule.forChild() <-- TODO: Throws a type error
    FormsModule
  ],
  declarations: []
})
export class SharedModule { }
