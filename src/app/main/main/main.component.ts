import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { ToastaService } from 'src/app/toastr/toasta.service';
import { Api } from 'src/app/utils/api';
import { Repayment } from 'src/models/repayment';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements AfterViewInit {
  inventoryItems: [] = [];
  totalOrders: number = 750;
  servedCustomers: any = '13,520';
  pendingOrders: any = 50;
  totalCash: any = '500,000';
  lifetimeD: any;
  monthlyD: any;
  weeklyD: any;
  dailyD: any;

  constructor(
    private loadingService: LoaderService,
    private toastService: ToastaService,
    private networkService: NetworkServiceService
  ) {
    //  this.dataSource = new MatTableDataSource(repayment);
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {
    this.loadReports();
  }

  loadReports = async () => {
    this.loadingService.isLoading.next(true);

    forkJoin({
      lifetime: this.networkService.doGet(
        Api.reportingUrl + '?timePeriod=lifetime'
      ),
      monthly: this.networkService.doGet(
        Api.reportingUrl + '?timePeriod=monthly'
      ),
      weekly: this.networkService.doGet(
        Api.reportingUrl + '?timePeriod=weekly'
      ),
      daily: this.networkService.doGet(Api.reportingUrl + '?timePeriod=daily'), // Fixed daily fetch
    }).subscribe({
      next: ({ lifetime, monthly, weekly, daily }) => {
        daily = JSON.parse(JSON.stringify(daily)).data;
        weekly = JSON.parse(JSON.stringify(weekly)).data;
        monthly = JSON.parse(JSON.stringify(monthly)).data;
        lifetime = JSON.parse(JSON.stringify(lifetime)).data;
        console.log('DATA REPORTS', { lifetime });

        const lifetimeData = lifetime || [];
        const monthlyData = monthly || [];
        const weeklyData = weekly || [];
        const dailyData = daily || [];

        // Logging in a readable JSON format
        console.log('===== REPORTS DATA =====');
        // Convert arrays to objects if they exist and are arrays
        const transformToObject = (data: any) =>
          Array.isArray(data)
            ? data.reduce(
                (acc: Record<string, any>, item: { _id: string | number }) => {
                  acc[item._id] = item;
                  return acc;
                },
                {}
              )
            : {};

        // Transform data
        this.dailyD = transformToObject(dailyData);
        this.weeklyD = transformToObject(weeklyData);
        this.monthlyD = transformToObject(monthlyData);
        this.lifetimeD = transformToObject(lifetimeData);

        // Log transformed data
        console.log('📅 Transformed Reports Data:');
        console.log('🟢 Daily Data:', JSON.stringify(this.dailyD, null, 2));
        console.log('🔵 Weekly Data:', JSON.stringify(this.weeklyD, null, 2));
        console.log('🟠 Monthly Data:', JSON.stringify(this.monthlyD, null, 2));
        console.log(
          '🔴 Lifetime Data:',
          JSON.stringify(this.lifetimeD, null, 2)
        );

        this.toastService.showSuccess('Reports loaded successfully', 'Success');
      },
      error: (error) => {
        console.error('Error loading reports:', error);
        this.toastService.showError(
          'An error occurred while fetching reports',
          'Error'
        );
      },
      complete: () => {
        this.loadingService.isLoading.next(false);
      },
    });
  };

  // Load inventory items from service
  loadInventory(): void {
    // this.inventoryService.getInventoryItems().subscribe(
    //   (items) => {
    //     this.inventoryItems = items;
    //   },
    //   (error) => {
    //     console.error('Failed to load inventory:', error);
    //   }
    // );
  }
  selectedTab: string = 'Monthly'; // Default to Monthly

  setTab(tab: string) {
    this.selectedTab = tab;
  }
  
  getObjectKeys(obj: any): string[] {
    return obj ? Object.keys(obj) : [];
  }
  
  getData(): any {
    switch (this.selectedTab) {
      case 'Daily':
        return this.dailyD;
      case 'Weekly':
        return this.weeklyD;
      case 'Monthly':
        return this.monthlyD;
      case 'Lifetime':
        return this.lifetimeD;
      default:
        return this.monthlyD;
    }
  }
  lottieConfig = {
    path: 'assets/lottie/loan740524749463.json', // Path to your Lottie animation JSON
    autoplay: true,
    loop: true
  };
  // Load order statistics
  loadOrderStats(): void {
    // this.inventoryService.getOrderStats().subscribe(
    //   (stats) => {
    //     this.totalOrders = stats.totalOrders;
    //     this.servedCustomers = stats.servedCustomers;
    //     this.pendingOrders = stats.pendingOrders;
    //   },
    //   (error) => {
    //     console.error('Failed to load order statistics:', error);
    //   }
    // );
  }

  // Calculate stock percentage for the progress bar
  getStockPercentage(stock: number): number {
    const maxStock = 100; // Assume 100 is the max stock level for visualization
    return (stock / maxStock) * 100;
  }
}
