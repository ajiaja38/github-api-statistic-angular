import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserUpdateDto } from '../types/interface/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUser({
    username,
    token,
  }: {
    username: string;
    token: string;
  }): Observable<IUser> {
    console.log(token);
    return this.http.get<IUser>(`${environment.BASE_URL}/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getAuthenticatedUser(): Observable<IUser> {
    return this.http.get<IUser>(
      `${environment.BASE_URL}/users/${localStorage.getItem('username')}`
    );
  }

  updateUser(iUserUpdateDto: IUserUpdateDto): Observable<IUser> {
    return this.http.patch<IUser>(
      `${environment.BASE_URL}/user`,
      iUserUpdateDto
    );
  }
}
