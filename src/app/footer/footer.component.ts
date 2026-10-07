import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  socials = [
    { icon: 'fa-facebook-f', url: 'https://www.facebook.com/BurgerLions/', label: 'Facebook' },
    { icon: 'fa-instagram', url: 'https://www.instagram.com/burgerlomebi/', label: 'Instagram' },
    
  ];
}