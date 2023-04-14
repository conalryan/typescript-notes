import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { decrement, increment, reset } from './counter.actions';

@Component({
  selector: 'lib-counter',
  template: `
    <button id="increment" (click)="increment()">Increment</button>

    <div>Current Count: {{ count$ | async }}</div>

    <button id="decrement" (click)="decrement()">Decrement</button>

    <button id="reset" (click)="reset()">Reset Counter</button>
  `,
  styles: []
})
export class CounterComponent {
count$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.pipe(select('count'));
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
