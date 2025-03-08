import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Material Ui
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './sidebar/sidebar/sidebar.component';
import { MainComponent } from './main/main/main.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { LoginComponent } from './auth/login/login/login.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NetworkServiceService } from './services/network-service.service';
import {  AddUserComponent } from './food/new/user/add-user.component';
import { EditUserComponent } from './loans/edit-loan/edit-user.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { RouterModule } from '@angular/router';
import { OtpComponent } from './auth/otp/otp.component';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminsComponent } from './users/admins/admins.component';
import { BorrowerComponent } from './users/borrower/borrower.component';
import { InvestorComponent } from './users/investor/investor.component';
import { AmortizationComponent } from './dialogs/amortization/amortization.component';
import { ListLoansComponent } from './food/view/list-loans/list-loans.component';
import { CreateRepaymentComponent } from './loans/repayments/create-repayment/create-repayment.component';
import { NewLoanComponent } from './loans/new/new-loan.component';
import { ListRepaymentComponent } from './loans/repayments/list-repayment/list-repayment.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ForgotPasswordOtpPageComponent } from './auth/forgot-password-otp-page/forgot-password-otp-page.component';
import { EcommerceComponent } from './shop/ecommerce/ecommerce.component';


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MainComponent,
    UsersListComponent,
    LoginComponent,
    NewLoanComponent,
    AddUserComponent,
    ListLoansComponent,
    EditUserComponent,
    RegisterComponent,
    OtpComponent,
    AdminsComponent,
    BorrowerComponent,
    InvestorComponent,
    AmortizationComponent,
    CreateRepaymentComponent,
    ListRepaymentComponent,
    ForgotPasswordComponent,
    ForgotPasswordOtpPageComponent,
    EcommerceComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSortModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatMenuModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatOptionModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: NetworkServiceService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
