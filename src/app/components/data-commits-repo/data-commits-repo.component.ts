import { Component } from '@angular/core';
import { ReposService } from '../../services/repos.service';
import { AlertService } from '../../services/alert.service';
import { IRepo } from '../../types/interface/repo.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ICommits } from '../../types/interface/commit.interface';
import { Chart } from 'chart.js/auto';
import { catchError, EMPTY, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'data-commits-repo',
  standalone: true,
  imports: [],
  templateUrl: './data-commits-repo.component.html',
  styleUrl: './data-commits-repo.component.scss',
})
export class DataCommitsRepoComponent {
  chart: any = [];
  repoCommits: { repo: string; commits: number }[] = [];

  constructor(
    private readonly reposService: ReposService,
    private readonly alertService: AlertService
  ) {}

  ngAfterViewInit(): void {
    this.getAllRepos();
  }

  getAllRepos(): void {
    this.reposService.getAllRepos().subscribe({
      next: (repos: IRepo[]) => {
        const repoCommitsMap = new Map<string, number>();
        const promises: Promise<any>[] = [];

        repos.forEach((data: IRepo) => {
          const repo: string = data.name;
          if (!repoCommitsMap.has(repo)) {
            const promise = new Promise<void>((resolve, reject) => {
              this.reposService.getCommitsPerRepo(repo).subscribe({
                next: (commits: ICommits[]) => {
                  repoCommitsMap.set(repo, commits.length);
                  resolve();
                },
                error: (err: HttpErrorResponse) => {
                  this.alertService.showAlert('error', err.message);
                  reject(err);
                },
              });
            });
            promises.push(promise);
          }
        });

        Promise.all(promises)
          .then(() => {
            this.repoCommits = Array.from(repoCommitsMap).map(
              ([repo, commits]) => ({ repo, commits })
            );
            this.initChart();
          })
          .catch((err: HttpErrorResponse) => {
            this.alertService.showAlert('error', err.message);
          });
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.showAlert('error', err.message);
      },
    });
  }

  initChart(): void {
    this.chart = new Chart('canvasCommits', {
      type: 'line',
      data: {
        labels: this.repoCommits.map((data) => data.repo),
        datasets: [
          {
            label: 'Total Commits',
            data: this.repoCommits.map((data) => data.commits),
            borderWidth: 1,
            backgroundColor: 'rgba(3, 174, 210, 0.2)',
            borderColor: 'rgba(3, 174, 210, 1)',
            tension: 0.3,
            fill: {
              target: 'origin',
              above: 'rgba(3, 174, 210, 0.2)',
              below: 'rgba(3, 174, 210, 0.2)',
            },
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
