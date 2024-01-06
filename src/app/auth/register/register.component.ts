import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth.scss']
})
export class RegisterComponent implements OnInit {
  private router = inject(Router);
  registerForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      repeatPassword: new FormControl('', Validators.required)
    });
  }

  submitForm(): void {
    Object.values(this.registerForm.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity();
    });
    if (this.registerForm.invalid) return;
    this.router.navigate(['/dashboard']);
  }

}
