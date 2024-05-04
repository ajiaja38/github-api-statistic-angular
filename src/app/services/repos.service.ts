import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRepo } from '../types/interface/repo.interface';
import { environment } from '../../environments/environment.development';
import { ICommits } from '../types/interface/commit.interface';

@Injectable({
  providedIn: 'root',
})
export class ReposService {
  constructor(private readonly http: HttpClient) {}

  getAllRepos(): Observable<IRepo[]> {
    return this.http.get<IRepo[]>(
      `${environment.BASE_URL}/users/${localStorage.getItem('username')}/repos`
    );
  }

  getRepos(page: number): Observable<IRepo[]> {
    return this.http.get<IRepo[]>(
      `${environment.BASE_URL}/users/${localStorage.getItem('username')}/repos`,
      {
        params: {
          per_page: 5,
          page,
        },
      }
    );
  }

  getCommitsPerRepo(repoName: string): Observable<ICommits[]> {
    return this.http.get<ICommits[]>(
      `${environment.BASE_URL}/repos/${localStorage.getItem(
        'username'
      )}/${repoName}/commits`
    );
  }
}
