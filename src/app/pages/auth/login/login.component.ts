import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../shared/services/auth.service';
import { ThreeOLoaderModule } from '../../../shared/components/three-o-loader/three-o-loader.module';
import { ControlMessagesModule } from '../../../shared/components/control-messages/control-messages.module';
import { ValidationUtil } from '../../../shared/utils/form-fields.validator';
import { Login } from '../../../shared/models/login';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ThreeOLoaderModule, ControlMessagesModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(
    private _auth: AuthService, 
    private _toastr: ToastrService,
    private _router: Router,
    private _modal: NgbModal
  ) { }

  otp = new FormControl();
  user: User | undefined;
  otpModalRef: NgbModalRef | undefined;
  loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, ValidationUtil.emailValidator] }),
    password: new FormControl('', Validators.required),
  });

  get f(): { [key: string]: AbstractControl } { return this.loginForm.controls; }

  onLogin(otpModal: any): void {
    if (!this.loginForm.dirty && !this.loginForm.valid) {
      return;
    }

    const data: Login = {
      email: this.f['email'].value,
      password: this.f['password'].value,
    };

    this._auth.login(data).subscribe((user: User) => {
      this.user = user;
      this.otpModalRef = this._modal.open(otpModal, { centered: true });
    }, (err: any) => {
      this._toastr.error(err.error.message, '', { disableTimeOut: true });
    });
  }

  onSubmitOtp() {
    // TODO - Create a model.
    const data = {
      pin: this.otp.getRawValue(),
      userId: this.user!.id,
    };

    this._auth.validatOtp(data).subscribe(_ => {
      this._router.navigate(['/dashboard']);
      this.otpModalRef?.close();
    }, (err: any) => {
      this._toastr.error(err.error.message, '', { disableTimeOut: true });
    });
  }

  onRequestOtp() {
    this._auth.requestOtp(this.user!.id).subscribe(_ => {
      this._toastr.success('An OTP has been sent to your email address');
      this.otp.setValue('');
    }, (err: any) => {
      this._toastr.error(err.error.message, '', { disableTimeOut: true });
    });
  }
}
