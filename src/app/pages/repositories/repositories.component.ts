import { Component } from '@angular/core';
import { CardReposComponent } from '../../components/card-repos/card-repos.component';
import { ReposService } from '../../services/repos.service';
import { IRepo } from '../../types/interface/repo.interface';
import { AlertService } from '../../services/alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-repositories',
  standalone: true,
  imports: [CardReposComponent, NgFor, NgClass],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
})
export class RepositoriesComponent {
  currentPage = 1;
  repos: IRepo[] = [];
  totalPages: number[] = [];

  constructor(
    private readonly reposService: ReposService,
    private readonly alertService: AlertService
  ) {}

  ngOnInit() {
    this.getReposByPage(this.currentPage);
    this.getTotalPages();
  }

  getTotalPages(): void {
    this.reposService.getAllRepos().subscribe({
      next: (repos: IRepo[]) => {
        this.totalPages = Array.from(
          { length: Math.ceil(repos.length / 5) },
          (_, index) => index + 1
        );
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.showAlert('error', err.message);
      },
    });
  }

  getReposByPage(page: number): void {
    this.reposService.getRepos(page).subscribe({
      next: (repos: IRepo[]) => {
        this.repos = repos;
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.showAlert('error', err.message);
      },
    });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getReposByPage(this.currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
