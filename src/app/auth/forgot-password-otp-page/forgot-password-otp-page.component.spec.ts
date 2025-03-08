import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordOtpPageComponent } from './forgot-password-otp-page.component';

describe('ForgotPasswordOtpPageComponent', () => {
  let component: ForgotPasswordOtpPageComponent;
  let fixture: ComponentFixture<ForgotPasswordOtpPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordOtpPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordOtpPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
