import { Component } from '@angular/core';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from '../../shared/components/nav/nav.component';

@Component({
  selector: 'ism-dashboard',
  standalone: true,
  imports: [

    RouterOutlet,
    NavComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}
