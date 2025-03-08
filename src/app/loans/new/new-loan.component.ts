import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { User } from 'src/app/models/User';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { ToastaService } from 'src/app/toastr/toasta.service';
import { Api } from 'src/app/utils/api';
import { UserData } from 'src/models/DecodedToken';
import { Loan, LoanModel } from 'src/models/loan';

@Component({
  selector: 'app-new-loan',
  templateUrl: './new-loan.component.html',
  styleUrls: ['./new-loan.component.css']
})
export class NewLoanComponent implements OnInit {
  
  ngOnInit(): void {
    this.listInvestors();
  }

  userType: string[] = ['Mutai Kagwe', 'Ndidi Nyoro', 'William Ruto'];
  selectedUser: any;
  loan: Loan;
  dataSource: MatTableDataSource<UserData>;

  constructor(
     private loadingService: LoaderService,
        private toastService: ToastaService,
        private networkService: NetworkServiceService,
         private router: Router,
  ) {
    this.loan = {} as Loan;

  }

  onUserSelect(event: any) {
    if (event.value) {
      this.loan.borrowerId = event.value.systemRef;
    }
  }

  submitLoan = async ()=>{

     // Start loading indicator
     this.loadingService.isLoading.next(true);
  
     try {
       // Validate required fields early
       if (!this.loan.borrowerId) {
         this.toastService.showError('Borrower is required', 'Error');
         return;
       }
       if (!this.loan.amount) {
         this.toastService.showError('Loan Amount is required', 'Error');
         return;
       }
   
       // Initialize user model with default role values
       const loan = new LoanModel();
       loan.amount = this.loan.amount
       loan.borrowerId = this.loan.borrowerId
       loan.interestRate = this.loan.interestRate
       loan.durationMonths = this.loan.durationMonths
       loan.description = this.loan.description;
       loan.issuedAt = this.loan.issuedAt
   
   
       // Send request to create user
       const response = await this.networkService.doPost(Api.loanUrl, loan).toPromise();
       console.log('Response:', response);
   
       this.toastService.showSuccess('Loan added successfully', 'Success');
       this.router.navigate(['/app-home']);
     } catch (error) {
       console.error('Error:', error);
       this.toastService.showError(error as string || 'Failed to add loan', 'Error');
     } finally {
       this.loadingService.isLoading.next(false);
     }


  }
  listInvestors = async () => {
    try {
      this.loadingService.isLoading.next(true);
  
      const response = await this.networkService.doGet(Api.userUrl + "?type=isBorrower").toPromise();

      const data = JSON.parse(JSON.stringify(response));
      
      
      if (response) {
        this.dataSource = new MatTableDataSource(data.data as UserData[]);
        
        console.log("Type of data.data:", typeof data.data.username);

        this.toastService.showSuccess("Borrowers loaded successfully", "Success");
      } else {
        this.toastService.showError("Failed to load borrowers", "Error");
      }
    } catch (error) {
      console.error("Error loading foods:", error);
      this.toastService.showError("An error occurred while fetching the borrowers", "Error");
    } finally {
      this.loadingService.isLoading.next(false);
    }
  };

}
