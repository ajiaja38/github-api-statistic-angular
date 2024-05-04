import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private router: Router) {}

  setToken(username: string, accessToken: string, url: string): void {
    localStorage.setItem('username', username);
    localStorage.setItem('accessToken', accessToken);
    this.router.navigateByUrl(url);
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  getToken(): string {
    return localStorage.getItem('accessToken') || environment.default_token;
  }
}
