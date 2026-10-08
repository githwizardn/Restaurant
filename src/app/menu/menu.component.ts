import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { SeoService } from '../services/seo.service';
import {
  MENU_ITEMS,
  MENU_TABS,
  MenuItem,
  MenuTab,
} from '../data/menu.data';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly seo = inject(SeoService);
  private readonly destroy$ = new Subject<void>();

  readonly tabs: MenuTab[] = MENU_TABS;
  readonly allItems: MenuItem[] = MENU_ITEMS;

  activeTab: MenuTab = 'ყველა';

  ngOnInit(): void {
    this.seo.updateTitle('მენიუ');
    this.seo.updateMetaTags({
      description:
        'Burger Lions — სრული მენიუ: ბურგერები, გარნირები, სასმელები და ტკბილეული. ხელნაკეთი პური, ახალი ხორცი.',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get filteredItems(): MenuItem[] {
    if (this.activeTab === 'ყველა') return this.allItems;
    return this.allItems.filter(item => item.tabs.includes(this.activeTab));
  }

  setActiveTab(tab: MenuTab): void {
    if (this.activeTab === tab) return;
    this.activeTab = tab;
    this.cdr.markForCheck();
  }

  trackById(_: number, item: MenuItem): number {
    return item.id;
  }

  trackByTab(_: number, tab: MenuTab): MenuTab {
    return tab;
  }
}