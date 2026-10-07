import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'about',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  advantages = [
    { icon: 'https://restfood.onlywebcoding.com.ua/images/advantage-1.png', label: 'ხელნაკეთი პური' },
    { icon: 'https://restfood.onlywebcoding.com.ua/images/advantage-2.png', label: '100% საქონლის ხორცი' },
    { icon: 'https://restfood.onlywebcoding.com.ua/images/advantage-3.png', label: 'ახალი ინგრედიენტები' },
  ];
}