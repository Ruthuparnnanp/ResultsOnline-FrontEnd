import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userSchema } from '../admin-dash/users.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  base_url: string = 'https://results-online-server.onrender.com';

  constructor(private http: HttpClient) {}

  getAdminData() {
    return this.http.get(`${this.base_url}/users/1`);
  }

  getAllUsers() {
    return this.http.get(`${this.base_url}/users`);
  }

  registerUser(user: userSchema) {
    return this.http.post(`${this.base_url}/users`, user);
  }

  deleteUser(id: any) {
    return this.http.delete(`${this.base_url}/users/${id}`);
  }

  getExistingUser(id: any) {
    return this.http.get(`${this.base_url}/users/${id}`);
  }

  updateUser(id: any, user: userSchema) {
    return this.http.put(`${this.base_url}/users/${id}`, user);
  }

  // update admin
  updateAdmin(adminData: userSchema) {
    return this.http.put(`${this.base_url}/users/1`, adminData);
  }
}
