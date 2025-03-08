import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from 'src/app/loader/loader.service';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { ToastaService } from 'src/app/toastr/toasta.service';
import { Api } from 'src/app/utils/api';
import { Repayment } from 'src/models/repayment';

@Component({
  selector: 'app-list-repayment',
  templateUrl: './list-repayment.component.html',
  styleUrls: ['./list-repayment.component.css']
})
export class ListRepaymentComponent  implements AfterViewInit {
  displayedColumns: string[] = [
      "loanAccount",
      "amount",
      "dueDate",
      "paymentMode",
      "paymentDate",
      "status",
      "createdAt",
      "updatedAt",
      "action"
  ];
  dataSource: MatTableDataSource<Repayment>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private loadingService: LoaderService,
    private toastService: ToastaService,
    private networkService: NetworkServiceService,
  ) {
    const repayment: Repayment[] = [];
    this.dataSource = new MatTableDataSource(repayment);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort; // Set sort property here
    this.listRepayments();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  listRepayments = async () => {
    try {
      this.loadingService.isLoading.next(true);
  
      const response = await this.networkService.doGet(Api.repaymentUrl ).toPromise();
      const data = JSON.parse(JSON.stringify(response));
      
      if (response) {
        this.dataSource.data = data.data as Repayment[];

        this.toastService.showSuccess("Repayments loaded successfully", "Success");
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
  editRepayment = async (id: string) => {}
  deleteRepayment = async (id: string) => {
    try {
      const confirmDelete = confirm("Are you sure you want to delete this food item?");
      if (!confirmDelete) {
        return;
      }
      this.loadingService.isLoading.next(true);

      const response = await this.networkService.doDelete(`${Api.foodUrl}/${id}`).toPromise();

      if (response) {
        this.toastService.showSuccess("Food deleted successfully", "Success");
        this.listRepayments();
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
