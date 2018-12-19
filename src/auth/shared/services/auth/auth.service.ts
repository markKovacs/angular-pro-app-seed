import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/do';

import { Store } from 'store';
import { NotExpr } from '@angular/compiler';

export interface User {
  email: string,
  uid: string,
  authenticated: boolean
}

@Injectable()
export class AuthService {

  // mapping angularfire.User to our User
  // remapped every time the authState changes
  auth$ = this.af.authState
    .do(next => {
      if (!next) {
        // will execute on first load and on logout,
        // so store[user] remains consistent
        this.store.set('user', null);
        return;
      }
      // if new user just logged in
      const user: User = {
        email: next.email,
        uid: next.uid,
        authenticated: true
      };
      this.store.set('user', user);
    });

  constructor(
    private af: AngularFireAuth,
    private store: Store
  ) { }

  get authState() {
    return this.af.authState;
  }

  createUser(email: string, password: string) {
    return this.af.auth
      .createUserWithEmailAndPassword(email, password);
  }

  login(email: string, password: string) {
    return this.af.auth
      .signInWithEmailAndPassword(email, password);
  }

  logoutUser() {
    return this.af.auth.signOut();
  }

}