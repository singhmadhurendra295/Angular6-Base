import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl: string = 'http://localhost:3000/api/users/';

  register(user: User) {
    return this.http.post(`users/register`, user);
  }

  updateUser(user: User) {
    console.log("update user",user._id,user);
    return this.http.put(this.baseUrl + user._id, user);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + id);
  }

  getAll() {
    return this.http.get<User[]>(this.baseUrl + '/list');
  }

  createUser(user: User) {
    return this.http.post(this.baseUrl + '/register', user);
  }

  getUserById(id: string) {
    return this.http.get<User>(this.baseUrl + '/' + id);
  }


}
