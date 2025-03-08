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
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent  implements AfterViewInit {
  displayedColumns: string[] = ['username', 'IsAdmin', 'status', 'createdAt', 'action'];
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
    this.listAdmins();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listAdmins = async () => {
    try {
      this.loadingService.isLoading.next(true);
  
      const response = await this.networkService.doGet(Api.userUrl + "?type=isAdmin").toPromise();
      const data = JSON.parse(JSON.stringify(response));
      
      if (response) {
        this.dataSource.data = data.data as UserData[];
        this.toastService.showSuccess("Admins loaded successfully", "Success");
      } else {
        this.toastService.showError("Failed to load foods", "Error");
      }
    } catch (error) {
      console.error("Error loading foods:", error);
      this.toastService.showError("An error occurred while fetching the foods", "Error");
    } finally {
      this.loadingService.isLoading.next(false);
    }
  };

  deleteFood = async (id: string) => {
    try {
      const confirmDelete = confirm("Are you sure you want to delete this food item?");
      if (!confirmDelete) {
        return;
      }
      this.loadingService.isLoading.next(true);

      const response = await this.networkService.doDelete(`${Api.foodUrl}/${id}`).toPromise();

      if (response) {
        this.toastService.showSuccess("Food deleted successfully", "Success");
        this.listAdmins();
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
