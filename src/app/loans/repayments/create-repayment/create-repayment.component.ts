import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { User } from 'src/app/models/User';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { ToastaService } from 'src/app/toastr/toasta.service';
import { Api } from 'src/app/utils/api';
import { UserData } from 'src/models/DecodedToken';
import { Loan, LoanModel } from 'src/models/loan';
import { Repayment, RepaymentModel } from 'src/models/repayment';

@Component({
  selector: 'app-create-repayment',
  templateUrl: './create-repayment.component.html',
  styleUrls: ['./create-repayment.component.css']
})
export class CreateRepaymentComponent implements OnInit {
  
  ngOnInit(): void {
    this.listLoans();
  }

  selectedUser: any;
  loan: Loan;
  repayment: Repayment;
  paymentModes= ['Mpesa', 'Cash','Card']
  dataSource: MatTableDataSource<Loan>;

  constructor(
     private loadingService: LoaderService,
        private toastService: ToastaService,
        private networkService: NetworkServiceService,
         private router: Router,
  ) {
    this.loan = {} as Loan;
    this.repayment = {} as Repayment;

  }

  onUserSelect(event: MatSelectChange) {
    console.log('Event Value:', event.value.amountToBePaid);
    this.selectedUser = event.value;
    this.repayment.loanAccount = event.value.loanAccount;
    this.repayment.borrowerId = event.value.borrowerId
    this.repayment.dueDate =  event.value.dueDate
    this.repayment.amountDue =  event.value.amountToBePaid
    this.repayment.username = event.value.username

    console.log("THE DATA DATA", this.repayment)

  }
  
  listLoans = async () => {
    try {
      this.loadingService.isLoading.next(true);

      const response = await this.networkService.doGet(Api.loanUrl).toPromise();

      const data = JSON.parse(JSON.stringify(response));

      if (response) {
        console.log('Response is ', data);
        this.dataSource = new MatTableDataSource(data.data as Loan[]);
        this.toastService.showSuccess('Loans loaded successfully', 'Success');
      } else {
        this.toastService.showError('Failed to load Loans', 'Error');
      }
    } catch (error) {
      console.error('Error loading foods:', error);
      this.toastService.showError(
        'An error occurred while fetching the loans',
        'Error'
      );
    } finally {
      this.loadingService.isLoading.next(false);
    }
  };

  submitRepayment = async () => {
    this.loadingService.isLoading.next(true);
  
    try {
      if (!this.repayment.amount) {
        this.toastService.showError('Loan Amount is required', 'Error');
        return;
      }
  
      if (!this.repayment.loanAccount) {
        this.toastService.showError('Please select a loan account', 'Error');
        return;
      }
  
      // Prepare repayment model
      const rp = new RepaymentModel();
      rp.amount = this.repayment.amount;
      rp.paymentMode = this.repayment.paymentMode;
      rp.paymentDate = this.repayment.paymentDate;
      rp.loanAccount = this.repayment.loanAccount;
      rp.dueDate = this.repayment.dueDate;
      rp.borrowerId = this.repayment.borrowerId;
  
      console.log("Sending Repayment Data:", rp); // Debugging
  
      // Send request
      const response: any = await this.networkService.doPost(Api.repaymentUrl, rp).toPromise();
      console.log('Response:', response);
  
      if (!response.error) {
        this.toastService.showSuccess('Repayment added successfully', 'Success');
        this.router.navigate(['/repayments']);
      } else {
        this.toastService.showError(response.error, 'Error');
      }
    } catch (error: any) {
      console.error('Error:', error);
      this.toastService.showError(error.error as string || 'Failed to add loan', 'Error');
    } finally {
      this.loadingService.isLoading.next(false);
    }
  };
  

  
}
