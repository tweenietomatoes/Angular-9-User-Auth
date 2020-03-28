import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  error: number;

  onSubmit() {
     this.authService.login(this.loginForm.value)
     .subscribe(data => console.log('Logged in!') , error => this.error = error);
  }

  ngOnInit(): void {
  }

}
