import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transfer, TransferCreateRequest } from '../models/transfer';
import { TransferStatus } from '../models/transfer-status';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private apiUrl = 'http://localhost:8080/api/transfers';

  constructor(private http: HttpClient) { }

  getAllTransfers(): Observable<Transfer[]> {
    return this.http.get<{message: string, data: Transfer[]}>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  createTransfer(request: TransferCreateRequest): Observable<Transfer> {
    return this.http.post<{message: string, data: Transfer}>(this.apiUrl, request).pipe(
      map(response => response.data)
    );
  }

  updateTransferStatus(id: string, status: TransferStatus): Observable<Transfer> {
    return this.http.patch<{message: string, data: Transfer}>(`${this.apiUrl}/${id}/status?status=${status}`, {}).pipe(
      map(response => response.data)
    );
  }
}
