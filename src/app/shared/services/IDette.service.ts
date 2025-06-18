import { Observable } from 'rxjs';
import { Dette } from '../models/dette.model';
import { Paiement } from '../models/paiement.model';

export interface IDette {
  getDettes(): Observable<Dette[]>;
  getDettesByClient(clientId: number): Observable<Dette[]>;
  getDette(id: number): Observable<Dette>;
  createDette(dette: Dette): Observable<Dette>;
  updateDette(dette: Dette): Observable<Dette>;
  deleteDette(id: number): Observable<void>;
  getPaiementsByDette(detteId: number): Observable<Paiement[]>;
  addPaiement(paiement: Paiement): Observable<Paiement>;
  updateMontantPaye(detteId: number, montantPaye: number): Observable<Dette>;
  getPaiement(id: number): Observable<Paiement>;
  updatePaiement(paiement: Paiement): Observable<Paiement>;
}
