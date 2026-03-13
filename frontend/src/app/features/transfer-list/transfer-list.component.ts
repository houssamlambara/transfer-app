import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe, DecimalPipe, CommonModule } from '@angular/common';
import { TransferService } from '../../core/services/transfer.service';
import { Transfer } from '../../core/models/transfer';
import { TransferStatus } from '../../core/models/transfer-status';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-transfer-list',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe, NzTableModule, NzTagModule, NzButtonModule, NzDropDownModule, NzIconModule],
  templateUrl: './transfer-list.component.html'
})
export class TransferListComponent implements OnInit {
  transfers: Transfer[] = [];
  isLoading = true;
  transferStatus = TransferStatus;

  private transferService = inject(TransferService);
  private messageService = inject(NzMessageService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadTransfers();
  }

  loadTransfers(): void {
    this.isLoading = true;
    this.transferService.getAllTransfers().subscribe({
      next: (data) => {
        this.transfers = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.messageService.error('Erreur lors du chargement des virements');
        this.isLoading = false;
      }
    });
  }

  updateStatus(id: string, newStatus: TransferStatus): void {
    this.transferService.updateTransferStatus(id, newStatus).subscribe({
      next: (updatedTransfer) => {
        this.messageService.success('Statut mis à jour !');
        const index = this.transfers.findIndex(t => t.id === updatedTransfer.id);
        if (index !== -1) {
          this.transfers = [
            ...this.transfers.slice(0, index),
            updatedTransfer,
            ...this.transfers.slice(index + 1)
          ];
        }
      },
      error: () => {
        this.messageService.error('Erreur lors de la mise à jour du statut');
      }
    });
  }

  getStatusColor(status: TransferStatus): string {
    switch (status) {
      case TransferStatus.COMPLETED: return 'success';
      case TransferStatus.FAILED: return 'error';
      case TransferStatus.CANCELLED: return 'default';
      case TransferStatus.PENDING: return 'processing';
      default: return 'default';
    }
  }
}
