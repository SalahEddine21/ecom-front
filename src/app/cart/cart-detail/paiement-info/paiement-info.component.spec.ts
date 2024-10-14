import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiementInfoComponent } from './paiement-info.component';

describe('PaiementInfoComponent', () => {
  let component: PaiementInfoComponent;
  let fixture: ComponentFixture<PaiementInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaiementInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaiementInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
