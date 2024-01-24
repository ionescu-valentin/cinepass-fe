import { inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from 'src/app/_core/services/auth-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.scss']
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthApiService);
  loginForm: FormGroup;


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

  }

  submitForm(): void {
    if (this.loginForm.invalid) return;
    this.router.navigate(['/dashboard']);
  }

  googleLogin(): void {
    console.log('res');
    this.authService.googleLogin().subscribe((res) => {
      console.log(res);
    });
  }
}
