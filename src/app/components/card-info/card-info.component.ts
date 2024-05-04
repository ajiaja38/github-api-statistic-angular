import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'card-info',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss',
})
export class CardInfoComponent {
  @Input() title: string = 'title';
  @Input() value: number | string = 0;
  @Input() icon: string = '';
  @Input() borderLeft: string = '';
}
