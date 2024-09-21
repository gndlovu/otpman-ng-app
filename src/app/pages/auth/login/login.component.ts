import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../shared/services/auth.service';
import { ThreeOLoaderModule } from '../../../shared/components/three-o-loader/three-o-loader.module';
import { ControlMessagesModule } from '../../../shared/components/control-messages/control-messages.module';
import { ValidationUtil } from '../../../shared/utils/form-fields.validator';
import { Login } from '../../../shared/models/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ThreeOLoaderModule, ControlMessagesModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _auth: AuthService, private _toastr: ToastrService) { }

  loginForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, ValidationUtil.emailValidator] }),
    password: new FormControl('', Validators.required),
  });

  get f(): { [key: string]: AbstractControl } { return this.loginForm.controls; }

  onLogin(): void {
    if (!this.loginForm.dirty && !this.loginForm.valid) {
      return;
    }

    const data: Login = {
      email: this.f['email'].value,
      password: this.f['password'].value,
    };

    this._auth.login(data).subscribe({
      error: (e) => {
        console.log('e', e);
        this._toastr.error('err', '', { disableTimeOut: true });
      },
      complete: () => console.log('complete')
    });
  }
}
