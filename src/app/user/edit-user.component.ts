import { Component, OnInit } from '@angular/core';
import { UserService } from "../services";
import { Router } from "@angular/router";
import { User } from "../models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  //styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  countries = [{
   id: '8f8c6e98',
   name: 'USA',
   code: 'USD'
  },
  {
   id: '169fee1a',
   name: 'Canada',
   code: 'CAD'
  },
  {
   id: '3953154c',
   name: 'UK',
   code: 'GBP'
  }];
  constructor(private formBuilder: FormBuilder,
     private router: Router,
     private userService: UserService) { }

  ngOnInit() {
    let userId = localStorage.getItem("editUserId");
    if (!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: ['', Validators.required],
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      //countryControl: [this.countries[0]],
      countryControl: [null, Validators.required]
    });
    this.userService.getUserById(userId)
      .subscribe(data => {
        console.log("userId",data)
        let {firstName,lastName,email} = data['data'];
        let userObj = {firstName,lastName,email}
        //this.editForm.setValue(userObj);
        this.editForm.patchValue(data['data']);
      });
  }

  onSubmit() {
    console.log(this.editForm.value);
    this.userService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
        });
  }

}
