import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { ValidationUtil } from '../../../shared/utils/form-fields.validator';
import { AuthService } from '../../../shared/services/auth.service';
import { Signup } from '../../../shared/models/signup';
import { ControlMessagesModule } from '../../../shared/components/control-messages/control-messages.module';
import { ThreeOLoaderModule } from '../../../shared/components/three-o-loader/three-o-loader.module';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ThreeOLoaderModule, ControlMessagesModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(
    private _auth: AuthService,
    private _toastr: ToastrService,
    private _router: Router,
  ) { }

  signupForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', { validators: [Validators.required, ValidationUtil.emailValidator] }),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      ValidationUtil.passwordStrengthValidator()]
    ),
    passwordConfirmation: new FormControl('', [Validators.required])
  }, ValidationUtil.passwordMatch('password', 'passwordConfirmation'));

  get f(): { [key: string]: AbstractControl } { return this.signupForm.controls; }

  ngOnInit(): void { }

  onSignup(): void {
    if (this.signupForm.invalid) {
      return;
    }

    const data: Signup = {
      firstName: this.f['firstName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['email'].value,
      password: this.f['password'].value,
    };

    this._auth.signup(data).subscribe(_ => {
      this._toastr.success('Account successfully created! You may log in.');
      this._router.navigate(['/login']);
    });
  }
}
