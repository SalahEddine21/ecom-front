import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaymentCard } from '../../../models/payment-card';

@Component({
  selector: 'app-paiement-review',
  templateUrl: './paiement-review.component.html',
  styleUrl: './paiement-review.component.css'
})
export class PaiementReviewComponent {

  @Input()
  paymentData!: PaymentCard;

  @Output()
  backEvent = new EventEmitter();

  @Output()
  validateCommandEvent = new EventEmitter();

  backToPrev(){
    this.backEvent.emit();
  }

  saveCart(){
    this.validateCommandEvent.emit();
  }
}
