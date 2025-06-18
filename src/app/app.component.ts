import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { HeaderComponent } from './pages/dashboard/components/layouts/header/header.component';
import { FooterComponent } from './pages/dashboard/components/layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-gray-100">
      <app-header *ngIf="!isLoginPage()"></app-header>
      <main>
        <router-outlet></router-outlet>
      </main>
      <app-footer *ngIf="!isLoginPage()"></app-footer>
    </div>
  `,
  styles: []
})
export class AppComponent {
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}



