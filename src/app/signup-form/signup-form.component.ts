import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  signupForm: FormGroup;
  user = {};

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) {
    this.createUserForm();
  }
  createUserForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      photoURL: ['', Validators.required],
      address: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      password: ['', Validators.required],
    });
  }
  ngOnInit() { }
  onSubmit() {
    this.user = this.signupForm.value;
    this.authService.signup(this.user);
    this.authService.uploadUser(this.user);
    this.signupForm.reset();
  }

}
