import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DetteService } from '../../../shared/services/Impl/dette.service';
import { ClientService } from '../../../shared/services/Impl/client.service';
import { Dette } from '../../../shared/models/dette.model';
import { Client } from '../../../shared/models/client.model';
import { Paiement } from '../../../shared/models/paiement.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dette-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dette-list.component.html',
  styleUrls: ['./dette-list.component.css']
})
export class DetteListComponent implements OnInit {
  dettes: Dette[] = [];
  client: Client | null = null;
  showAddDetteForm = false;
  newDette: Dette = {
    montantDette: 0,
    date: new Date().toISOString().split('T')[0],
    clientId: 0,
    montantPaye: 0,
    montantRestant: 0
  };
  paiementMontant: number = 0;
  paiementDetteId: number | null = null;
  paiementsParDette: { [detteId: number]: Paiement[] } = {};
  paiementHistoriqueVisible: { [detteId: number]: boolean } = {};

  constructor(
    private detteService: DetteService,
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const clientId = this.route.snapshot.paramMap.get('id');
    if (clientId) {
      this.newDette.clientId = +clientId;
      this.loadClient(+clientId);
      this.loadDettes(+clientId);
    }
  }

  loadClient(id: number): void {
    this.clientService.getClient(id).subscribe((client: Client) => {
      this.client = client;
    });
  }

  loadDettes(clientId: number): void {
    this.detteService.getDettesByClient(clientId).subscribe(dettes => {
      this.dettes = dettes.map(d => ({ ...d, id: Number(d.id) }));
    });
  }

  onSubmit(): void {
    this.newDette.montantPaye = 0;
    this.newDette.montantRestant = this.newDette.montantDette;
    this.detteService.createDette(this.newDette).subscribe(() => {
      this.showAddDetteForm = false;
      this.loadDettes(this.newDette.clientId);
      this.newDette = {
        clientId: this.newDette.clientId,
        date: new Date().toISOString().split('T')[0],
        montantDette: 0,
        montantPaye: 0,
        montantRestant: 0
      };
    });
  }

  deleteDette(id: number | undefined): void {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette dette ?')) {
      this.detteService.deleteDette(id).subscribe(() => {
        this.loadDettes(this.client!.id!);
      });
    }
  }

  showPaiementForm(detteId: number): void {
    this.paiementDetteId = Number(detteId);
    this.paiementMontant = 0;
  }

  payerDette(): void {
    if (this.paiementDetteId && this.paiementMontant > 0) {
      const paiement: Paiement = {
        detteId: Number(this.paiementDetteId),
        date: new Date().toISOString().split('T')[0],
        montant: this.paiementMontant
      };
      this.detteService.addPaiement(paiement)
        .pipe(
          switchMap(() => this.detteService.getPaiementsByDette(Number(this.paiementDetteId!))),
          switchMap((paiements) => {
            const totalPaye = paiements.reduce((sum, p) => sum + p.montant, 0);
            return this.detteService.updateMontantPaye(Number(this.paiementDetteId!), totalPaye);
          })
        )
        .subscribe(() => {
          this.loadDettes(this.client!.id!);
          this.paiementDetteId = null;
          this.paiementMontant = 0;
        });
    }
  }

  annulerPaiement(): void {
    this.paiementDetteId = null;
    this.paiementMontant = 0;
  }

  afficherHistorique(detteId: number): void {
    const idNum = Number(detteId);
    if (!this.paiementHistoriqueVisible[idNum]) {
      this.detteService.getPaiementsByDette(idNum).subscribe((paiements) => {
        this.paiementsParDette[idNum] = paiements;
        this.paiementHistoriqueVisible[idNum] = true;
      });
    } else {
      this.paiementHistoriqueVisible[idNum] = false;
    }
  }
}
