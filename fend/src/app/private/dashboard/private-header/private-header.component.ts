import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_service/auth.service';

@Component({
  selector: 'private-header',
  templateUrl: './private-header.component.html',
  styleUrls: ['./private-header.component.scss']
})
export class PrivateHeaderComponent implements OnInit {

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

  // cards() {
    // 
    // console.debug('cards');
    // 
    // this.authService.signout();
    // this.router.navigate(['/prv']);
  // }

}
