import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AmortizationComponent } from 'src/app/dialogs/amortization/amortization.component';
import { LoaderService } from 'src/app/loader/loader.service';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { ToastaService } from 'src/app/toastr/toasta.service';

import { Api } from 'src/app/utils/api';

import { Loan } from 'src/models/loan';

export interface FoodData {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
  showMore?: boolean;
}

@Component({
  selector: 'app-list-loans',
  templateUrl: './list-loans.component.html',
  styleUrls: ['./list-loans.component.css'],
})
export class ListLoansComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'progress', 'fruit', 'action'];
  dataSource: MatTableDataSource<Loan>;
  filter = {
    fromDate: null,
    toDate: null,
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private loadingService: LoaderService,
    private toastService: ToastaService,
    private networkService: NetworkServiceService,
    private router: Router,
    public dialog: MatDialog
  ) {
    const loan: Loan[] = [];

    this.dataSource = new MatTableDataSource(loan);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.listLoans();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  applyDateFilter() {
    console.log('From Date:', this.filter.fromDate);
    console.log('To Date:', this.filter.toDate);
  }

  getStatusClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'active':
        return 'status-active';
      case 'approved':
        return 'status-approved';
      case 'defaulted':
        return 'status-defaulted';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
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

  openDialog(loan: any,username: string): void {
    this.dialog.open(AmortizationComponent, {
      height: 'auto',
      width: 'auto',
      data: { data: loan, username: username},
    });
  }

  async approveLoan(loan: Loan) {
    loan.status = 'Approved';
    // Start loading indicator

    console.log('SYSTEMREf', loan.systemRef);
    this.loadingService.isLoading.next(true);

    try {
      // Validate required fields early
      if (!loan.status) {
        this.toastService.showError('Status to update is required', 'Error');
        return;
      }

      const response = await this.networkService
        .doPut(Api.loanUrl + '/' + loan.systemRef, loan)
        .toPromise();
      console.log('Response:', response);
      this.toastService.showSuccess(
        `${loan.username} your loan of ${loan.amount}  has been approved`,
        'Success'
      );

      this.router.navigate(['/app-home']);
    } catch (error) {
      console.error('Error:', error);
      this.toastService.showError(
        (error as string) || 'Failed to add user',
        'Error'
      );
    } finally {
      this.loadingService.isLoading.next(false);
    }
  }

  async rejectLoan(loan: any) {
    loan.status = 'Rejected'; // Update status in UI
    // Start loading indicator
    this.loadingService.isLoading.next(true);

    try {
      // Validate required fields early
      if (!loan.status) {
        this.toastService.showError('Status to update is required', 'Error');
        return;
      }

      // Send request to create user
      const response = await this.networkService
        .doPut(Api.loanUrl + '/' + loan.systemRef, loan)
        .toPromise();
      console.log('Response:', response);
      this.toastService.showError(
        `${loan.username} your loan of ${loan.amount}  has been rejected`,
        'Error'
      );

      this.router.navigate(['/app-home']);
    } catch (error) {
      console.error('Error:', error);
      this.toastService.showError(
        (error as string) || 'Failed to add user',
        'Error'
      );
    } finally {
      this.loadingService.isLoading.next(false);
    }
  }
  async defaultedLoan(loan: any) {
    loan.status = 'Defaulted';
    // Start loading indicator
    this.loadingService.isLoading.next(true);

    try {
      // Validate required fields early
      if (!loan.status) {
        this.toastService.showError('Status to update is required', 'Error');
        return;
      }

      // Send request to create user
      this.networkService
        .doPut(Api.loanUrl + '/' + loan.systemRef, loan)
        .pipe(
          catchError((error) => {
            this.loadingService.isLoading.next(false);
            this.toastService.showError(
              'Failed to sign in. Please try again.',
              'Error'
            );
            return of(null);
          })
        )
        .subscribe((response) => {
          const res = JSON.parse(JSON.stringify(response));
          if (res.message == 'loan Deactivated successfully') {
            this.loadingService.isLoading.next(false);
            this.toastService.showSuccess(`${res.message}`, 'Success');
          } else {
            this.loadingService.isLoading.next(false);
            this.toastService.showError(
              `${loan.username}your loan of ${loan.amount} has been rejected`,
              'Error'
            );
          }
        });

      this.router.navigate(['/app-home']);
    } catch (error) {
      console.error('Error:', error);
      this.toastService.showError(
        (error as string) || 'Failed to add user',
        'Error'
      );
    } finally {
      this.loadingService.isLoading.next(false);
    }
  }

  async completeLoan(loan: any) {
    loan.status = 'Completed';
    // Start loading indicator
    this.loadingService.isLoading.next(true);

    try {
      // Validate required fields early
      if (!loan.status) {
        this.toastService.showError('Status to update is required', 'Error');
        return;
      }

      // Send request to create user
      const response = await this.networkService
        .doPut(Api.loanUrl + '/' + loan.systemRef, loan)
        .toPromise();
      console.log('Response:', response);
      this.toastService.showError(
        `${loan.username}your loan of ${loan.amount} has been rejected`,
        'Error'
      );

      this.router.navigate(['/app-home']);
    } catch (error) {
      console.error('Error:', error);
      this.toastService.showError(
        (error as string) || 'Failed to add user',
        'Error'
      );
    } finally {
      this.loadingService.isLoading.next(false);
    }
  }
}
