import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup, Validators } from '@angular/forms';

export class ValidationUtil {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config: { [key: string]: string } = {
      required: 'This frield is required.',
      invalidEmail: 'Input a valid email address.',
      passwordStrength: 'Must contain 1 upper & lowercase characters and a number.',
      passwordMatch: 'Your passwords do not match.',
      minlength: `Must contain a minimum length of ${validatorValue.requiredLength} characters.`,
      maxlength: `Must contain a maximum length of ${validatorValue.requiredLength} characters.`,
      invalidNumber: 'Must contain only numbers.',
      invalidAccountNumber: 'Must contain 11 numbers.'
    };

    return config[validatorName];
  }

  static passwordMatch(controlName: string, matchingControlName: string): Validators | null {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // if (matchingControl.errors && !matchingControl.errors.passwordMatch) {
      //     // return if another validator has already found an error on the matchingControl
      //     return;
      // }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  static emailValidator(control: AbstractControl) {
    if (control.value.match(
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    )) {
      return null;
    }

    return { invalidEmail: true };
  }

  static passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]+/.test(value);

      const hasLowerCase = /[a-z]+/.test(value);

      const hasNumeric = /[0-9]+/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

      return !passwordValid ? { passwordStrength: true } : null;
    }
  }

  static numberValidator(control: AbstractControl) {
    if (control.value.match(/^[0-9]*$/)) {
      return null;
    }

    return { invalidNumber: true };
  }

  static accountNumberValidator(control: AbstractControl) {
    if (control.value.match(/^[0-9]{11}$/)) {
      return null;
    }

    return { invalidAccountNumber: true };
  }

  static noMatch(controlName: string, matchingControlName: string): Validators | null {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // if (matchingControl.errors && !matchingControl.errors.passwordMatch) {
      //     // return if another validator has already found an error on the matchingControl
      //     return;
      // }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ passwordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
