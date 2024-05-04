import { Component, Input } from '@angular/core';
import { IRepo } from '../../types/interface/repo.interface';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'card-repos',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './card-repos.component.html',
  styleUrl: './card-repos.component.scss',
})
export class CardReposComponent {
  @Input() repo!: IRepo;
}
