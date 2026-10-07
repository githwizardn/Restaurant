import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
}

@Component({
  selector: 'team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamComponent {
    members: TeamMember[] = [
    {
      name: 'გელა მაჭავარიანი',
      role: 'შეფ-მზარეული',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600',
      bio: '15 წლიანი გამოცდილება. ბურგერის ფილოსოფია — მინიმალიზმი.',
    },
    {
      name: 'თამარ გვერდწითელი',
      role: 'მზარეული',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600',
      bio: 'პასუხისმგებელია სოუსებსა და ხელნაკეთ პურზე.',
    },
    {
      name: 'ნია ბარათელი',
      role: 'მიმტანი',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600',
      bio: 'ყოველთვის მზადაა, რომ თქვენი ვიზიტი დაუვიწყარი გახადოს.',
    },
    {
      name: 'ვაჟა ბრეგვაძე',
      role: 'მიმტანი',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
      bio: 'იცის ყველა ბურგერის ისტორია ზეპირად.',
    },
  ];
}