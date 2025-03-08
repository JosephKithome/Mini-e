import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';
import { NetworkServiceService } from 'src/app/services/network-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  implements OnInit {
  isLoginPage = false;
  isSideNavOpened = false;
  isHomePage = false;
  username: string | null = null;

  constructor(public loadeService: LoaderService, private router: Router, private netService: NetworkServiceService) {}

  ngOnInit(): void {

    this.username=this.netService.getUsernameFromToken();

    console.log("Username not found", this.username);
    if(this.username==null) {
      console.log("Username not found", this.username);
      this.router.navigateByUrl('/login', { replaceUrl: true }); 
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/app-home' || 
          event.url === '/users' ||
          event.url === '/admins' ||
          event.url === '/borrowers' ||
          event.url === '/investors' ||
          event.url === '/new-user' ||
          event.url === '/food' ||
          event.url === '/loans' ||
          event.url === '/add-user' ||
          event.url.startsWith('/edit-user') ||
          event.url === '/repayments' ||
          event.url === '/create-repayment') {
          this.isSideNavOpened = true;
          this.isHomePage = true;
        } else {
          this.isSideNavOpened = false;
          this.isHomePage = false;
        }
        this.isLoginPage = event.url === '/login' || event.url === '/register';
        if (this.isLoginPage) {
          this.router.navigateByUrl('/login', { replaceUrl: true }); 
        }
      }
    });
  }

  logout(): void {
    this.netService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  
  }
  
}
