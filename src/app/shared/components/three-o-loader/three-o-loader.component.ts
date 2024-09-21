import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from '../../models/loader';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-three-o-loader',
  template: `
    <div *ngIf="showLoader; else showText"
      class="three-o-loading"
      style="margin-bottom: 16px;padding-top: 2px;padding-bottom: 2px;"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
    <ng-template #showText>
        {{ originText }}
    </ng-template>
  `,
  styleUrls: ['./three-o-loader.component.css'],
})
export class ThreeOLoaderComponent implements OnInit, OnDestroy {
  @Input() originText!: string;

  _loaderState = new Subscription();
  showLoader = false;

  constructor(private _loader: LoaderService) { }

  ngOnInit(): void {
    this._loaderState = this._loader.state.subscribe((state: LoaderState) => {
      this.showLoader = state.show;
    });
  }

  ngOnDestroy(): void {
    this._loaderState.unsubscribe();
  }
}
