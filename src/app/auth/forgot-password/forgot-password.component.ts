import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  emailOrPhone: string = ''; // Stores the user's email or phone number

  constructor(private router: Router) {}

  // Function to send OTP
  sendOtp() {
    if (this.emailOrPhone) {
      console.log('Sending OTP to:', this.emailOrPhone);
      // Add your logic to send OTP (e.g., API call)
      // For now, navigate to the OTP verification page
      this.router.navigate(['/verify-otp']);
    } else {
      alert('Please enter your email or phone number.');
    }
  }
}