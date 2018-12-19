import { Component } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth/auth.service';

@Component({
  selector: "login",
  template: `
    <div>
      <auth-form (submitted)="loginUser($event)">
        <h1>Login</h1>
        <a routerLink='/auth/register'>Not registered?</a>
        <button type="submit">
          Login
        </button>
        <div class="error" *ngIf="error">
          {{ error }}
        </div>
      </auth-form>
    </div>
  `
})
export class LoginComponent {

  error: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async loginUser(event: FormGroup) {
    // async await is to call then() on the Promise
    // try-catch is to handle errors with server communication
    const { email, password } = event.value;
    try {
      await this.authService.login(email, password);
      // below this await, all code is executed if successful
      this.router.navigate(['/']);
    } catch (err) {
      this.error = err.message;
    }
  }

}