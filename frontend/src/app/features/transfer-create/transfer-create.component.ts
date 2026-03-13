import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransferService } from '../../core/services/transfer.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-transfer-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './transfer-create.component.html'
})
export class TransferCreateComponent implements OnInit {
  validateForm: FormGroup;
  isSubmitting = false;
  users: User[] = [];
  isLoadingUsers = false;

  private fb = inject(FormBuilder);
  private transferService = inject(TransferService);
  private userService = inject(UserService);
  private router = inject(Router);
  private toast = inject(ToastService);

  constructor() {
    this.validateForm = this.fb.group({
      senderEmail: [null, [Validators.required]],
      receiverEmail: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.isLoadingUsers = true;
    this.validateForm.get('senderEmail')?.disable();
    this.validateForm.get('receiverEmail')?.disable();
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.isLoadingUsers = false;
        this.validateForm.get('senderEmail')?.enable();
        this.validateForm.get('receiverEmail')?.enable();
      },
      error: () => {
        this.toast.error('Impossible de charger les utilisateurs');
        this.isLoadingUsers = false;
      }
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.validateForm.value.senderEmail === this.validateForm.value.receiverEmail) {
        this.toast.warning("L'expéditeur et le bénéficiaire doivent être différents !");
        return;
      }
      this.isSubmitting = true;
      this.transferService.createTransfer(this.validateForm.value).subscribe({
        next: () => {
          this.toast.success('Virement initié avec succès');
          this.router.navigate(['/transfers']);
        },
        error: (err: any) => {
          const errorMsg = err.error?.message || 'Erreur lors du virement';
          this.toast.error(errorMsg);
          this.isSubmitting = false;
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
