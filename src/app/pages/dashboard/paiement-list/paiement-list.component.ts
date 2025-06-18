import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DetteService } from '../../../shared/services/Impl/dette.service';
import { Paiement } from '../../../shared/models/paiement.model';
import { Dette } from '../../../shared/models/dette.model';

@Component({
  selector: 'app-paiement-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './paiement-list.component.html',
  styleUrls: ['./paiement-list.component.css']
})
export class PaiementListComponent implements OnInit {
  paiements: Paiement[] = [];
  dette: Dette | null = null;
  showAddPaiementForm = false;
  newPaiement: Paiement = {
    montant: 0,
    date: new Date().toISOString().split('T')[0],
    detteId: 0
  };

  constructor(
    private detteService: DetteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const detteId = Number(this.route.snapshot.params['detteId']);
    if (detteId) {
      this.loadDette(detteId);
      this.loadPaiements(detteId);
    }
  }

  loadDette(id: number): void {
    this.detteService.getDette(id).subscribe(dette => {
      this.dette = dette;
    });
  }

  loadPaiements(detteId: number): void {
    this.detteService.getPaiementsByDette(detteId).subscribe((paiements: Paiement[]) => {
      this.paiements = paiements;
    });
  }

  onSubmit(): void {
    if (this.dette && this.newPaiement.montant && this.newPaiement.date) {
      this.newPaiement.detteId = this.dette.id!;
      this.detteService.addPaiement(this.newPaiement).subscribe(() => {
        this.loadPaiements(this.dette!.id!);
        this.showAddPaiementForm = false;
        this.newPaiement = {
          montant: 0,
          date: new Date().toISOString().split('T')[0],
          detteId: 0
        };
      });
    }
  }
}
