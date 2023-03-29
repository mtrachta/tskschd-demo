import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_model/auth/auth.entity';
import { AuthService } from './_service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Task Manager';
  // 
  user: User;
  // 
  constructor(private router: Router, private authService: AuthService) {
    console.debug('constructor');
    this.authService.currentUser.subscribe(x => this.user = x);
  }

  logout() {
    console.debug('logout');
    this.authService.signout();
    this.router.navigate(['/pbl']);
  }
}
