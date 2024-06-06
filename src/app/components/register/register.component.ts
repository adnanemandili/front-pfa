import { RegisterService } from './../../services/register.service';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, CommonModule ,] ,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  RegisterForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('USER'),
  });
  loginFailed: boolean = false;
  errorMessage: string = '';
  loginSucceded: boolean = false;
  successMessage: string = '';

  constructor(
    private registerService : RegisterService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  handleRegister() {
    console.log(this.RegisterForm.value)
    if (
      this.RegisterForm.valid
    ) {
      this.registerService
        .registerUser(
          this.RegisterForm.value.firstname ?? '',
          this.RegisterForm.value.lastname ?? '',
          this.RegisterForm.value.role ?? 'USER',
          this.RegisterForm.value.email ?? '',
          this.RegisterForm.value.password ?? ''
        )
        .subscribe({
          next: resp => {
            console.log(resp);
            alert("Account created successfully!");
          },
          error: (err) => {
            this.loginFailed = true;
            this.errorMessage = 'registration failed. Please try again.';
          },
        });
    } else {
      console.log('Please enter a valid values.');
    }
  }
  
}
