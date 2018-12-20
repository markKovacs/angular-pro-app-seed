import { Injectable } from '@angular/core';
import { Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canLoad(route: Route): Observable<boolean> {
    return this.authService.authState
      .map((user) => {
        if (!user) {
          this.router.navigate(['/auth/login']);
        }
        return !!user;
      })
      .take(1);
  }

}