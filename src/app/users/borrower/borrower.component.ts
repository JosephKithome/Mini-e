import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from 'src/app/loader/loader.service';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { ToastaService } from 'src/app/toastr/toasta.service';
import { Api } from 'src/app/utils/api';
import { UserData } from 'src/models/DecodedToken';

@Component({
  selector: 'app-borrower',
  templateUrl: './borrower.component.html',
  styleUrls: ['./borrower.component.css']
})
export class BorrowerComponent   implements AfterViewInit {
  displayedColumns: string[] = ['username', 'IsBorrower', 'status', 'createdAt', 'action'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private loadingService: LoaderService,
    private toastService: ToastaService,
    private networkService: NetworkServiceService,
  ) {
    const users: UserData[] = [];
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // Set sort property here
    this.listBorrowers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listBorrowers = async () => {
    try {
      this.loadingService.isLoading.next(true);
  
      const response = await this.networkService.doGet(Api.userUrl + "?type=isBorrower").toPromise();
      const data = JSON.parse(JSON.stringify(response));
      
      if (response) {
        this.dataSource.data = data.data as UserData[];
        this.toastService.showSuccess("Borrowers loaded successfully", "Success");
      } else {
        this.toastService.showError("Failed to load Borrowers borrowers", "Error");
      }
    } catch (error) {
      console.error("Error loading borrowers:", error);
      this.toastService.showError("An error occurred while fetching the borrowers", "Error");
    } finally {
      this.loadingService.isLoading.next(false);
    }
  };

  deleteFood = async (id: string) => {
    try {
      const confirmDelete = confirm("Are you sure you want to delete this borrowers item?");
      if (!confirmDelete) {
        return;
      }
      this.loadingService.isLoading.next(true);

      const response = await this.networkService.doDelete(`${Api.foodUrl}/${id}`).toPromise();

      if (response) {
        this.toastService.showSuccess("Food deleted successfully", "Success");
        this.listBorrowers();
      } else {
        this.toastService.showError("Failed to delete the food item", "Error");
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      this.toastService.showError("An error occurred while deleting the food item", "Error");
    } finally {
      this.loadingService.isLoading.next(false);
    }
  };
}
