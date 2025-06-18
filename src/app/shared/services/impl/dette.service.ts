import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dette } from '../../models/dette.model';
import { Paiement } from '../../models/paiement.model';
import { switchMap } from 'rxjs/operators';
import { IDette } from '../IDette.service';

@Injectable({
  providedIn: 'root'
})
export class DetteService implements IDette {
  private apiUrl = 'http://localhost:3000/dettes';
  private paiementsUrl = 'http://localhost:3000/paiements';

  constructor(private http: HttpClient) { }

  getDettes(): Observable<Dette[]> {
    return this.http.get<Dette[]>(this.apiUrl);
  }

  getDettesByClient(clientId: number): Observable<Dette[]> {
    return this.http.get<Dette[]>(`${this.apiUrl}?clientId=${clientId}`);
  }

  getDette(id: number): Observable<Dette> {
    return this.http.get<Dette>(`${this.apiUrl}/${id}`);
  }

  createDette(dette: Dette): Observable<Dette> {
    return this.http.post<Dette>(this.apiUrl, dette);
  }

  updateDette(dette: Dette): Observable<Dette> {
    return this.http.put<Dette>(`${this.apiUrl}/${dette.id}`, dette);
  }

  deleteDette(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPaiementsByDette(detteId: number): Observable<Paiement[]> {
    return this.http.get<Paiement[]>(`${this.paiementsUrl}?detteId=${detteId}`);
  }

  addPaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.post<Paiement>(this.paiementsUrl, paiement);
  }

  updateMontantPaye(detteId: number, montantPaye: number): Observable<Dette> {
    return this.getDette(detteId).pipe(
      switchMap(dette => {
        dette.montantPaye = montantPaye;
        dette.montantRestant = dette.montantDette - montantPaye;
        return this.updateDette(dette);
      })
    );
  }

  getPaiement(id: number): Observable<Paiement> {
    return this.http.get<Paiement>(`${this.paiementsUrl}/${id}`);
  }

  updatePaiement(paiement: Paiement): Observable<Paiement> {
    return this.http.put<Paiement>(`${this.paiementsUrl}/${paiement.id}`, paiement);
  }
} 