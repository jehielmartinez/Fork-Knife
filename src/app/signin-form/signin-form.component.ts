import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent implements OnInit {
  signinForm: FormGroup;
  user = {};

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) {
    this.createUserForm();
   }
   createUserForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {}
  onSubmit() {
    this.user = this.signinForm.value;
    this.authService.signin(this.user);
    this.signinForm.reset();
  }

}
