import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAuthentificationService } from '../IAuthentification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationMockService implements IAuthentificationService {
  private loggedIn = false;

  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      this.loggedIn = true;
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    this.loggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
} 