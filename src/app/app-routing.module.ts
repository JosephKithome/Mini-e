import { ListLoansComponent } from './food/view/list-loans/list-loans.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { MainComponent } from './main/main/main.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { RegisterComponent } from './auth/register/register/register.component';
import { OtpComponent } from './auth/otp/otp.component';
import { AdminsComponent } from './users/admins/admins.component';
import { BorrowerComponent } from './users/borrower/borrower.component';
import { InvestorComponent } from './users/investor/investor.component';
import { AddUserComponent } from './food/new/user/add-user.component';
import { EditUserComponent } from './loans/edit-loan/edit-user.component';
import { NewLoanComponent } from './loans/new/new-loan.component';
import { CreateRepaymentComponent } from './loans/repayments/create-repayment/create-repayment.component';
import { ListRepaymentComponent } from './loans/repayments/list-repayment/list-repayment.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ForgotPasswordOtpPageComponent } from './auth/forgot-password-otp-page/forgot-password-otp-page.component';

const routes: Routes = [
  {path: 'app-home', component: MainComponent},
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {path: 'users', component: UsersListComponent},
  {path: 'admins', component: AdminsComponent},
  {path: 'borrowers', component: BorrowerComponent},
  {path: 'investors', component: InvestorComponent},



  {path: 'login', component: LoginComponent},
  {path: 'otp', component: OtpComponent},
  {path: 'signUp', component: RegisterComponent},

  {path: 'forgot-password', component:  ForgotPasswordComponent },
  {path: 'verify-otp', component: ForgotPasswordOtpPageComponent},
  {path: 'loans', component:  ListLoansComponent },

  {path: 'add-user', component:  AddUserComponent },
  {path: 'edit-user/:systemRef', component: EditUserComponent},

  //  users
  {path: 'new-user', component: NewLoanComponent},

  {path: 'repayments', component: ListRepaymentComponent},
  {path: 'create-repayment', component: CreateRepaymentComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
