import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementReviewComponent } from './paiement-review.component';

describe('PaiementReviewComponent', () => {
  let component: PaiementReviewComponent;
  let fixture: ComponentFixture<PaiementReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaiementReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
