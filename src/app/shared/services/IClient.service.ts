import { Observable } from 'rxjs';
import { Client } from '../models/client.model';

export interface IClient {
  getClients(): Observable<Client[]>;
  getClient(id: number): Observable<Client>;
  createClient(client: Client): Observable<Client>;
  updateClient(client: Client): Observable<Client>;
  deleteClient(id: number): Observable<void>;
} 