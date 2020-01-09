import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CounterComponent } from './counter.component';
import { counterReducer } from './counter.reducer';

@NgModule({
  declarations: [
    CounterComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('count', counterReducer)
  ],
  providers: [],
  exports: [CounterComponent]
})
export class CounterModule { }
