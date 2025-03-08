import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password-otp-page',
  templateUrl: './forgot-password-otp-page.component.html',
  styleUrls: ['./forgot-password-otp-page.component.css']
})
export class ForgotPasswordOtpPageComponent {
    otp: string[] = ['', '', '', '', '', ''];
  
    // Move focus to the next input field
    onOtpInput(index: number, event: any) {
      if (event.target.value && index < 5) {
        const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
        if (nextInput) (nextInput as HTMLElement).focus();
      }
    }
  
    // Move focus to the previous input field on backspace
    onOtpBackspace(index: number, event: any) {
      if (event.key === 'Backspace' && index > 0) {
        const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
        if (prevInput) (prevInput as HTMLElement).focus();
      }
    }
  
    // Verify OTP
    verifyOtp() {
      const otpCode = this.otp.join('');
      console.log('OTP Entered:', otpCode);
      // Add your OTP verification logic here
    }
  
    // Resend OTP
    resendOtp() {
      console.log('Resending OTP...');
      // Add your OTP resend logic here
    }
  
}
