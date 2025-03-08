import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRepaymentComponent } from './create-repayment.component';

describe('CreateRepaymentComponent', () => {
  let component: CreateRepaymentComponent;
  let fixture: ComponentFixture<CreateRepaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRepaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRepaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
