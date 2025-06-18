import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetteService } from '../../../shared/services/Impl/dette.service';
import { ClientService } from '../../../shared/services/Impl/client.service';
import { Dette } from '../../../shared/models/dette.model';
import { Client } from '../../../shared/models/client.model';

@Component({
  selector: 'app-dette-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dette-form.component.html',
})
export class DetteFormComponent implements OnInit {
  dette: Dette = {
    montantDette: 0,
    date: new Date().toISOString().split('T')[0],
    clientId: 0,
    montantPaye: 0,
    montantRestant: 0
  };
  isEditMode = false;
  clients: Client[] = [];

  constructor(
    private detteService: DetteService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
    const detteId = this.route.snapshot.params['id'];
    if (detteId) {
      this.isEditMode = true;
      this.loadDette(detteId);
    }
  }

  loadClients(): void {
    this.clientService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  loadDette(id: number): void {
    this.detteService.getDette(id).subscribe((dette: Dette) => {
      this.dette = dette;
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.detteService.updateDette(this.dette).subscribe(() => {
        this.router.navigate(['/dashboard/clients', this.dette.clientId, 'dettes']);
      });
    } else {
      this.detteService.createDette(this.dette).subscribe(() => {
        this.router.navigate(['/dashboard/clients', this.dette.clientId, 'dettes']);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard/clients', this.dette.clientId, 'dettes']);
  }
} 