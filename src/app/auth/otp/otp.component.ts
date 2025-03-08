import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { Otp } from 'src/app/models/Otp';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { ToastaService } from 'src/app/toastr/toasta.service';
import { Api } from 'src/app/utils/api';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  otp: string[] = ['', '', '', ''];
  email: string = '';
  userId: string = '';
  countdown: number = 60;
  interval: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoaderService,
    private toastService: ToastaService,
    private networkService: NetworkServiceService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      this.userId = params['userId'];

      this.startCountdown();
    });
  }

  moveFocus(
    currentInput: HTMLInputElement,
    nextInput?: HTMLInputElement,
    backspace?: boolean
  ) {
    if (!backspace && currentInput.value.length === 1 && nextInput) {
      nextInput.focus();
    } else if (backspace && currentInput.value.length === 0 && nextInput) {
      nextInput.focus();
    }
  }

  verifyOtp() {
    const otpCode = this.otp.join('');
  
    this.loadingService.isLoading.next(true);
  
    try {
      const otpModel = new Otp();
      otpModel.userId = this.userId?.trim();
      otpModel.otpCode = otpCode?.trim();
  
      if (!otpModel.otpCode) {
        this.toastService.showError('OTP code cannot be empty', 'Error');
        this.loadingService.isLoading.next(false);
        return;
      }
      if (!otpModel.userId) {
        this.toastService.showError('UserId cannot be empty', 'Error');
        this.loadingService.isLoading.next(false);
        return;
      }
  
      this.networkService.doLogin(Api.finish2FaLoginUrl, otpModel).subscribe({
        next: (response) => {
          this.loadingService.isLoading.next(false);
          console.log("API Response:", response);
  
          if (response && response.token) {
            this.toastService.showSuccess(response.data?.message || 'OTP Verified Successfully!', 'Success');
            this.router.navigate(['/app-home']);
          } else {
            this.toastService.showError(response.error?.message || 'Invalid OTP, please try again.', 'Error');
          }
        },
        error: (err) => {
          this.loadingService.isLoading.next(false);
          console.error("API Error:", err.error);
  
          const errorMessage = err.error.error || 'An unexpected error occurred. Please try again.';
          this.toastService.showError(errorMessage, 'Error');
        }
      });
  
    } catch (error) {
      this.loadingService.isLoading.next(false);
      console.error("Unexpected Error:", error);
      this.toastService.showError('Unexpected error occurred. Please try again.', 'Error');
    }
  }
  

  resendOtp() {
    console.log('Resending OTP...');
    // Add logic to resend OTP
  }

  startCountdown() {
    this.countdown = 60;
    this.interval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }
}
