import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ReposService } from '../../services/repos.service';
import { AlertService } from '../../services/alert.service';
import { IRepo } from '../../types/interface/repo.interface';

@Component({
  selector: 'data-lang-chart',
  standalone: true,
  imports: [],
  templateUrl: './data-lang-chart.component.html',
  styleUrl: './data-lang-chart.component.scss',
})
export class DataLangChartComponent {
  chart: any = [];
  languageCounts: { language: string; count: number }[] = [];

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
        const languageMap = new Map<string, number>();

        repos.forEach((data: IRepo) => {
          const language = data.language;
          if (language) {
            if (languageMap.has(language)) {
              languageMap.set(language, languageMap.get(language)! + 1);
            } else {
              languageMap.set(language, 1);
            }
          }
        });

        this.languageCounts = Array.from(languageMap).map(
          ([language, count]) => ({
            language,
            count,
          })
        );

        this.initChart();
      },
      error: (err: HttpErrorResponse) => {
        this.alertService.showAlert('error', err.message);
      },
    });
  }

  initChart(): void {
    this.chart = new Chart('canvass', {
      type: 'pie',
      data: {
        labels: this.languageCounts.map((data) => data.language),
        datasets: [
          {
            label: 'Count',
            data: this.languageCounts.map((data) => data.count),
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
