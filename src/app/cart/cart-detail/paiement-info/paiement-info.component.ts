import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentCard } from '../../../models/payment-card';

@Component({
  selector: 'app-paiement-info',
  templateUrl: './paiement-info.component.html',
  styleUrl: './paiement-info.component.css'
})
export class PaiementInfoComponent implements OnChanges{

  @Input()
  paymentData!: PaymentCard;

  @Output()
  validatePaymentEvent = new EventEmitter<PaymentCard>();
  
  @Output()
  backEvent = new EventEmitter();

  paymentForm: FormGroup;

  constructor(private readonly fb: FormBuilder){
    this.paymentForm = this.fb.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['paymentData']){
      this.paymentForm.patchValue({
        cardNumber: this.paymentData?.cardNumber,
        cardHolderName: this.paymentData?.cardHolderName,
        expiryDate: this.paymentData?.expiryDate,
        cvv: this.paymentData?.cvv
      });
    }
  }

  proceedToReview() {
    if (this.paymentForm.valid) {
      this.paymentData = this.paymentForm.value;
      this.validatePaymentEvent.emit(this.paymentData);
    }
  }

  backToPrev(){
    this.backEvent.emit();
  }

}
