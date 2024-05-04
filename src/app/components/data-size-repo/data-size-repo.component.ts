import { Component, Input, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ReposService } from '../../services/repos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IRepo } from '../../types/interface/repo.interface';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'data-size-repo',
  standalone: true,
  imports: [],
  templateUrl: './data-size-repo.component.html',
  styleUrl: './data-size-repo.component.scss',
})
export class DataSizeRepoComponent implements AfterViewInit {
  chart: any = [];
  repoSize: { name: string; size: number }[] = [];

  constructor(
    private readonly resposService: ReposService,
    private readonly alertService: AlertService
  ) {}

  ngAfterViewInit(): void {
    this.getAllRepos();
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
        this.initChart();
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.showAlert('error', err.message);
      },
    });
  }

  initChart(): void {
    this.chart = new Chart('canvas', {
      type: 'polarArea',
      data: {
        labels: this.repoSize
          .filter((data) => data.size >= 3000)
          .map((data) => data.name),
        datasets: [
          {
            label: 'Size',
            data: this.repoSize
              .filter((data) => data.size >= 3000)
              .map((data) => data.size),
            borderWidth: 1,
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
