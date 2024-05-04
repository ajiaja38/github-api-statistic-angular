import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../types/interface/user.interface';
import { CardInfoComponent } from '../../components/card-info/card-info.component';
import { AlertService } from '../../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataSizeRepoComponent } from '../../components/data-size-repo/data-size-repo.component';
import { ReposService } from '../../services/repos.service';
import { IRepo } from '../../types/interface/repo.interface';
import { DataLangChartComponent } from '../../components/data-lang-chart/data-lang-chart.component';
import { DataCommitsRepoComponent } from '../../components/data-commits-repo/data-commits-repo.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CardInfoComponent,
    DataSizeRepoComponent,
    DataLangChartComponent,
    DataCommitsRepoComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  user!: IUser;
  repoSize: { name: string; size: number }[] = [];

  constructor(
    private readonly userService: UserService,
    private readonly alertService: AlertService,
    private readonly resposService: ReposService
  ) {}

  ngOnInit(): void {
    this.getAuthenticatedUser();
    this.getAllRepos();
  }

  getAuthenticatedUser(): void {
    this.userService.getAuthenticatedUser().subscribe({
      next: (user: IUser) => {
        this.user = user;
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.showAlert('error', err.message);
      },
    });
  }

  getAllRepos(): void {
    this.resposService.getAllRepos().subscribe({
      next: (repos: IRepo[]) => {
        this.repoSize = repos.map((data: IRepo) => {
          return {
            name: data.name,
            size: data.size,
          };
        });
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.showAlert('error', err.message);
      },
    });
  }
}
