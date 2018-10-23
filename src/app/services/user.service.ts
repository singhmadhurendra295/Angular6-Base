import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get(`/users/` + id);
  }

  register(user: User) {
    return this.http.post(`/users/register`, user);
  }

  update(user: User) {
    return this.http.put(`/users/` + user._id, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/` + id);
  }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

}
