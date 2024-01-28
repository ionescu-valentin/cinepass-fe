import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApiService } from './_core/services/auth-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'cinepass-fe';
  user: any;

  private authService = inject(SocialAuthService);
  private authApiService = inject(AuthApiService);
  private router = inject(Router);

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.authApiService.googleLogin(user).subscribe(() => {
        this.router.navigate(['/dashboard']);
      });
    });
  }
}
