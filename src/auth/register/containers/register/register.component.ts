import { Component } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: "register",
  template: `
    <div>
      <auth-form (submitted)="registerUser($event)">
        <h1>Register</h1>
        <a routerLink='/auth/login'>Already have an account?</a>
        <button type="submit">
          Create account
        </button>
        <div class="error" *ngIf="error">
          {{ error }}
        </div>
      </auth-form>
    </div>
  `
})
export class RegisterComponent {

  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async registerUser(event: FormGroup) {
    // async await is to call then() on the Promise
    // try-catch is to handle errors with server communication
    const { email, password } = event.value;
    try {
      await this.authService.createUser(email, password);
      // below this await, all code is executed if successful
      this.router.navigate(['/auth/login']);
    } catch (err) {
      this.error = err.message;
    }
  }

}