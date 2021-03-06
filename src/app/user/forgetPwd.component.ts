import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '../services';

@Component({ templateUrl: 'forgetPwd.component.html' })

export class ForgotPwdComponent implements OnInit {
  forgotPwdForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.forgotPwdForm = this.formBuilder.group({
      username: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.forgotPwdForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPwdForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.register(this.forgotPwdForm.value)
      .pipe(first())
      .subscribe(
        data => {
          //this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          //this.alertService.error(error);
          this.loading = false;
        });
  }
}
