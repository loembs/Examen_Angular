import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrls: ['./connexion-page.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ConnexionPageComponent {
  loginForm: FormGroup;
  hidePassword = true;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Ici, vous pouvez intégrer votre logique d'authentification
      if (username === 'admin' && password === 'admin') {
        this.router.navigate(['/dashboard/clients']);
      } else {
        this.errorMessage = 'Identifiants invalides';
      }
    }
  }
}
