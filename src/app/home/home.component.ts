import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService ,AlertService } from '../services';
import { User } from '../models';
import { UserService } from '../services';

@Component({templateUrl: 'home.component.html'})
export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService,
      private route: ActivatedRoute,
      private alertService : AlertService,
      private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers();
        });
    }

    editUser(user: User): void {
      console.log("edit user",user._id);
      localStorage.removeItem("editUserId");
      localStorage.setItem("editUserId", (user._id).toString());
      this.router.navigate(['edit-user']);
    };


    private loadAllUsers() {
        this.userService.getAll().pipe(first()).subscribe(data => {
            this.users = data['data'];
        });
    }

    addUser(): void {
      this.router.navigate(['add-user']);
    };
}
