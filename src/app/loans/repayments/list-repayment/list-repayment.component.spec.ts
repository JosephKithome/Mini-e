import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepaymentComponent } from './list-repayment.component';

describe('ListRepaymentComponent', () => {
  let component: ListRepaymentComponent;
  let fixture: ComponentFixture<ListRepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRepaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
