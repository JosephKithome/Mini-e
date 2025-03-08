import { UserModel } from '../../../../../../Jipush-loans-backend/src/models/UserModel';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { User } from 'src/app/models/User';
import { NetworkServiceService } from 'src/app/services/network-service.service';
import { ToastaService } from 'src/app/toastr/toasta.service';
import { Api } from 'src/app/utils/api';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements AfterViewInit {
  user: User;
  userType: string[] = ['isAdmin', 'isInvestor', 'isBorrower'];
  selectedCategory: any;

  cancel() {
    throw new Error('Method not implemented.');
  }
  

  constructor(
    private loadingService: LoaderService,
    private toastService: ToastaService,
    private router: Router,
    private networkService: NetworkServiceService
  ) {
    this.user = {} as User;
  }
  ngAfterViewInit(): void {}

  saveUser = async () => {
    // Start loading indicator
    this.loadingService.isLoading.next(true);
  
    try {
      // Validate required fields early
      if (!this.user.firstName) {
        this.toastService.showError('First Name is required', 'Error');
        return;
      }
      if (!this.user.lastName) {
        this.toastService.showError('Last Name is required', 'Error');
        return;
      }
  
      // Initialize user model with default role values
      const userModel = new User();
      userModel.email = this.user.email;
      userModel.firstName = this.user.firstName;
      userModel.lastName = this.user.lastName;
      userModel.phone = this.user.phone;
  
      // Explicitly set default values for roles
      userModel.isAdmin = false;
      userModel.isInvestor = false;
      userModel.isBorrower = false;
  
      // Assign the correct role dynamically
      if (this.selectedCategory === 'isAdmin') {
        userModel.isAdmin = true;
      } else if (this.selectedCategory === 'isInvestor') {
        userModel.isInvestor = true;
      } else if (this.selectedCategory === 'isBorrower') {
        userModel.isBorrower = true;
      }
  
      // Send request to create user
      const response = await this.networkService.doPost(Api.createUserUrl, userModel).toPromise();
      console.log('Response:', response);
  
      this.toastService.showSuccess('User added successfully', 'Success');
      this.router.navigate(['/app-home']);
    } catch (error) {
      console.error('Error:', error);
      this.toastService.showError(error as string || 'Failed to add user', 'Error');
    } finally {
      this.loadingService.isLoading.next(false);
    }
  };
  
}
