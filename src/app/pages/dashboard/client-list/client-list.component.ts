import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ClientService } from '../../../shared/services/Impl/client.service';
import { Client } from '../../../shared/models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe((clients: Client[]) => {
      this.clients = clients;
    });
  }

  deleteClient(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.loadClients();
      });
    }
  }

  goToDettes(clientId: number): void {
    this.router.navigate(['/dashboard/clients', clientId, 'dettes']);
  }

  goToEdit(clientId: number): void {
    this.router.navigate(['/dashboard/clients', clientId, 'edit']);
  }

  goToCreate(): void {
    this.router.navigate(['/dashboard/clients/new']);
  }
}
