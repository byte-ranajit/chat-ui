import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API = "http://localhost:8080/auth";
  constructor(private readonly http: HttpClient) {}

  login(username: string, password: string) {
    const result : any = this.http.post(`${this.API}/login`, { username, password });
    console.log(result);
    return result;
  }

  saveToken(res: any) {
    localStorage.setItem('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  logout(){
    localStorage.clear();
  }

  isLoggedIn() {
    return this.getAccessToken() !== null;}
}
