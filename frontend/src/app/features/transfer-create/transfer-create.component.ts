import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TransferService } from '../../core/services/transfer.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-transfer-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzSelectModule, NzInputNumberModule, NzButtonModule, NzCardModule],
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
  private msg = inject(NzMessageService);

  formatter = (value: number): string => (value ? `${value} DH` : '');
  parser = (value: string): number => +value.replace(' DH', '');

  constructor() {
    this.validateForm = this.fb.group({
      senderEmail: [null, [Validators.required]],
      receiverEmail: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(0.01)]]
    });
  }

  ngOnInit(): void {
    this.isLoadingUsers = true;
    this.userService.getAllUsers().subscribe({
      next: (data: User[]) => {
        this.users = data;
        this.isLoadingUsers = false;
      },
      error: () => {
        this.msg.error('Impossible de charger les utilisateurs');
        this.isLoadingUsers = false;
      }
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.validateForm.value.senderEmail === this.validateForm.value.receiverEmail) {
        this.msg.warning("L'expéditeur et le bénéficiaire doivent être différents !");
        return;
      }
      this.isSubmitting = true;
      this.transferService.createTransfer(this.validateForm.value).subscribe({
        next: () => {
          this.msg.success('Virement initié avec succès');
          this.router.navigate(['/transfers']);
        },
        error: (err: any) => {
          const errorMsg = err.error?.message || 'Erreur lors du virement';
          this.msg.error(errorMsg);
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
