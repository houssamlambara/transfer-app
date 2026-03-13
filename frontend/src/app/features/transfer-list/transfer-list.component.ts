import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TransferService } from '../../core/services/transfer.service';
import { ToastService } from '../../core/services/toast.service';
import { Transfer } from '../../core/models/transfer';
import { TransferStatus } from '../../core/models/transfer-status';

@Component({
  selector: 'app-transfer-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './transfer-list.component.html',
})
export class TransferListComponent implements OnInit {
  transfers: Transfer[] = [];
  isLoading = true;
  transferStatus = TransferStatus;
  openDropdownId: string | null = null;

  private transferService = inject(TransferService);
  private toast = inject(ToastService);

  constructor(private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.loadTransfers();
  }

  loadTransfers(): void {
    this.isLoading = true;
    this.transferService.getAllTransfers().subscribe({
      next: (data) => {
        this.transfers = data;
        this.isLoading = false;
        this.cdr.detectChanges()
      },
      error: () => {
        this.toast.error('Erreur lors du chargement des virements');
        this.isLoading = false;
      }
    });
  }

  toggleDropdown(id: string, event: Event): void {
    event.stopPropagation();
    this.openDropdownId = this.openDropdownId === id ? null : id;
  }

  closeAllDropdowns(): void {
    this.openDropdownId = null;
  }

  updateStatus(id: string, newStatus: TransferStatus): void {
    this.openDropdownId = null;
    this.transferService.updateTransferStatus(id, newStatus).subscribe({
      next: (updatedTransfer) => {
        this.toast.success('Statut mis à jour !');
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
        this.toast.error('Erreur lors de la mise à jour du statut');
      }
    });
  }

  getStatusClasses(status: TransferStatus): string {
    switch (status) {
      case TransferStatus.COMPLETED: return 'bg-green-100 text-green-800';
      case TransferStatus.FAILED:    return 'bg-red-100 text-red-800';
      case TransferStatus.CANCELLED: return 'bg-gray-100 text-gray-600';
      case TransferStatus.PENDING:   return 'bg-yellow-100 text-yellow-800';
      default:                       return 'bg-gray-100 text-gray-600';
    }
  }

  canUpdateStatus(status: TransferStatus): boolean {
    return status !== TransferStatus.COMPLETED && status !== TransferStatus.CANCELLED;
  }
}

