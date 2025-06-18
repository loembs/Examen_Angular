import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetteService } from '../../../shared/services/Impl/dette.service';
import { Paiement } from '../../../shared/models/paiement.model';
import { Dette } from '../../../shared/models/dette.model';

@Component({
  selector: 'app-paiement-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './paiement-form.component.html',
})
export class PaiementFormComponent implements OnInit {
  paiement: Paiement = {
    montant: 0,
    date: new Date().toISOString().split('T')[0],
    detteId: 0
  };
  isEditMode = false;
  dettes: Dette[] = [];

  constructor(
    private detteService: DetteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDettes();
    const paiementId = this.route.snapshot.params['id'];
    if (paiementId) {
      this.isEditMode = true;
      this.loadPaiement(paiementId);
    }
  }

  loadDettes(): void {
    this.detteService.getDettes().subscribe(dettes => {
      this.dettes = dettes;
    });
  }

  loadPaiement(id: number): void {
    this.detteService.getPaiement(id).subscribe((paiement: Paiement) => {
      this.paiement = paiement;
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.detteService.updatePaiement(this.paiement).subscribe(() => {
        this.router.navigate(['/dettes', this.paiement.detteId, 'paiements']);
      });
    } else {
      this.detteService.addPaiement(this.paiement).subscribe(() => {
        this.router.navigate(['/dettes', this.paiement.detteId, 'paiements']);
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dettes', this.paiement.detteId, 'paiements']);
  }
} 