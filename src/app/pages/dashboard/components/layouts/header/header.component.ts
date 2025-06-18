import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Ici, on peut aussi supprimer le token ou l'utilisateur du localStorage si besoin
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
} 