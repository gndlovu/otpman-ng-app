import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderState } from '../models/loader';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
  state = new BehaviorSubject<LoaderState>({ show: false });

  show(method: string) {
    if (method.toLowerCase() !== 'get') {
      this.toogleState(true);
    }
  }

  hide() {
    this.toogleState(false);
  }

  private toogleState(show: boolean) {
    this.state.next({ show } as LoaderState);
  }
}
