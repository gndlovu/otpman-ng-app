import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderState } from '../models/loader';

@Injectable({
    providedIn: 'root',
})
export class LoaderService {
  state = new BehaviorSubject<LoaderState>({ show: false, loaderId: '' });

  show(method: string, loaderId: string) {
    if (method.toLowerCase() !== 'get') {
      this.toogleState(true, loaderId);
    }
  }

  hide() {
    this.toogleState(false);
  }

  private toogleState(show: boolean, loaderId?: string) {
    this.state.next({ show, loaderId } as LoaderState);
  }
}
