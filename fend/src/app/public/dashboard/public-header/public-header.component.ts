import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss']
})
export class PublicHeaderComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) {
    // 
    console.debug('constructor');
  }

  ngOnInit(): void {
    // 
    console.debug('ngOnInit');
  }

  logout() {
    // 
    console.debug('signout');
    // 
    this.authService.signout();
    this.router.navigate(['/pbl/auth/signin']);
  }

}
