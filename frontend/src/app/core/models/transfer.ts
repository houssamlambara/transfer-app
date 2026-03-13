import { TransferStatus } from './transfer-status';
import { User } from './user';

export interface Transfer {
  id: string;
  sender: User;
  receiver: User;
  amount: number;
  status: TransferStatus;
  createdAt: string;
}

export interface TransferCreateRequest {
  senderEmail: string;
  receiverEmail: string;
  amount: number;
}
