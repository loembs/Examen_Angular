import { Observable } from 'rxjs';

export interface IAuthentificationService {
  login(username: string, password: string): Observable<boolean>;
  logout(): void;
  isAuthenticated(): boolean;
} 