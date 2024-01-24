import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cinepass-fe';
  user: any;

  private authService = inject(SocialAuthService);
  private router = inject(Router);

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log('this.user:', this.user)
      this.router.navigate(['/dashboard']);
    });
  }
}
