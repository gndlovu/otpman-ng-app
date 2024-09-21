import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private _toastr: ToastrService) { }

  handle(result: HttpErrorResponse) {
    let errors;
    switch (result.status) {
      case 0:
      case 500:
        errors = ['Unable to connect, the server could be temporarily unavailable or too busy. Try again in a few moments.']
        break;
      case 404:
        errors = ['The requested resouce could not be found. Try again in a few moments.'];
        break;
      case 422:
        errors = this.handleValidation(result.error.errors);
        break;
    }

    if (errors) { this.showErrors(errors) }
  }

  private handleValidation(errors: { [key: string]: string[] }) {
    const errMessages = [];
    for (const key in errors) {
      // The front-end already validated most of the inputs, we're not expecting much here.
      errMessages.push(...errors[key]);
    }

    return errMessages;
  }

  private showErrors(errors: string[]) {
    for (const error of errors) {
      this._toastr.error(error, '', { disableTimeOut: true });
    }
  }
}
