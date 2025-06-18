import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../shared/services/Impl/client.service';
import { Client } from '../../../shared/models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  client: Client = {
    nom: '',
    telephone: '',
    adresse: ''
  };
  isEditMode = false;

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.clientService.getClient(+id).subscribe((client: Client) => {
        this.client = client;
      });
    }
  }

  onSubmit(): void {
    if (this.isEditMode && this.client.id) {
      this.clientService.updateClient(this.client).subscribe(() => {
        this.goBack();
      });
    } else {
      this.clientService.createClient(this.client).subscribe(() => {
        this.goBack();
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/clients']);
  }
}
