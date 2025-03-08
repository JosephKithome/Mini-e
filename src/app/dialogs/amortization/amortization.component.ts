import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoanScheduleItem } from 'src/app/models/loanSchedule';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { LoaderService } from 'src/app/loader/loader.service';
import { ToastaService } from 'src/app/toastr/toasta.service';
import { Api } from 'src/app/utils/api';
import { LoanAmortization } from 'src/models/amortization';

@Component({
  selector: 'app-amortization',
  templateUrl: './amortization.component.html',
  styleUrls: ['./amortization.component.css'],
})
export class AmortizationComponent implements OnInit {
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef

  constructor(
    public dialogRef: MatDialogRef<AmortizationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public user: any,
    public dialog: MatDialog,
    private loadingService: LoaderService,
    private toastService: ToastaService,
    private networkService: NetworkServiceService
  ) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadLoanAmortizations();
    this.loadScheduleOneByOne();
  }

  amortizationSchedule: LoanAmortization[] = [];
  isMaximized: boolean = false;

  loadingItems: boolean[] = [];
  displayedColumns: string[] = [];
  
  dataSource = new MatTableDataSource<LoanAmortization>(
    this.amortizationSchedule
  );
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource.filter = filterValue;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  async loadLoanAmortizations() {
    try {
      this.loadingService.isLoading.next(true);
  
      const response = await this.networkService
        .doGet(Api.loanUrl + '/amortizations/' + this.data.data.systemRef)
        .toPromise();
  
      if (response) {
        const data = JSON.parse(JSON.stringify(response));
        this.amortizationSchedule = data.data as LoanAmortization[];
        this.dataSource.data = this.amortizationSchedule;
  
        console.log("NOW THE DATASOURCE::::", this.dataSource.data);
  
        // Call after setting the data
        this.loadScheduleOneByOne();
  
        this.toastService.showSuccess(
          'Amortizations loaded successfully',
          'Success'
        );
      } else {
        this.toastService.showError('Failed to load amortizations', 'Error');
      }
    } catch (error) {
      console.error('Error loading amortizations:', error);
      this.toastService.showError(
        'An error occurred while fetching the amortizations',
        'Error'
      );
    } finally {
      this.loadingService.isLoading.next(false);
    }
  }
  

  loadScheduleOneByOne() {
    console.log("HAHHHAHE",this.amortizationSchedule)
    this.amortizationSchedule.forEach((_, index) => {
      this.loadingItems[index] = true;
      setTimeout(() => {
        this.loadingItems[index] = false;
      }, (index + 1) * 1000);
    });
  }
  getTotalInterest(): number {
    return this.amortizationSchedule.reduce((sum, row) => sum + row.interest, 0);
  }
  
  getTotalPrincipal(): number {
    return this.amortizationSchedule.reduce((sum, row) => sum + row.paymentMade, 0);
  }
  

  downloadPDF() {
    if (!this.pdfContent) {
      console.error('PDF Content not found');
      return;
    }

    const DATA = this.pdfContent.nativeElement;

    html2canvas(DATA, { scale: 2 }).then((canvas) => {
      const imgWidth = 190; // Slightly less than A4 width to prevent cutoff
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');

      let position = 10; // Initial Y position
      let pageCount = Math.ceil(imgHeight / pageHeight); // Number of pages needed

      for (let i = 0; i < pageCount; i++) {
        const y = -(i * pageHeight);
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          10,
          position,
          imgWidth,
          imgHeight
        );

        if (i < pageCount - 1) {
          pdf.addPage();
        }
      }

      pdf.save(`${this.user.username} Amortization_Schedule.pdf`);
    });
  }
  toggleMaximize(): void {
    this.isMaximized = !this.isMaximized;
    this.openDialog(this.user.username);
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent) {
    if (this.isMaximized) {
      this.isMaximized = false; // Restore on Esc
    } else {
      this.dialogRef.close(); // Close dialog
    }
  }
  openDialog(username: string): void {
    this.dialog.open(AmortizationComponent, {
      width: '80%',
      height: '80%',
      maxWidth: '100vw', // Allows maximizing to full width
      maxHeight: '100vh', // Allows maximizing to full height
      panelClass: 'custom-dialog-container', // Optional: Add custom styling if needed
      data: { data: this.dataSource, username: username }, // Pass data to the dialog
    });
  }
}
