import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoConfig {
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);

  private readonly SITE_NAME = 'Burger Lions';
  private readonly DEFAULT_IMAGE = 'https://burgerlions.com/wp-content/uploads/2024/08/New-Project-2.png';

  updateTitle(_subtitle?: string): void {
  this.titleService.setTitle(this.SITE_NAME);
}

  updateMetaTags(config: SeoConfig = {}): void {
    const description =
      config.description ??
      'ხელნაკეთი ბურგერები ახალი ინგრედიენტებით. ვარკეთილი, თბილისი.';
    const image = config.image ?? this.DEFAULT_IMAGE;
    const url = config.url ?? 'https://burgerlions.com';
    const type = config.type ?? 'website';

    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ property: 'og:title', content: this.titleService.getTitle() });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:image', content: image });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:type', content: type });
    this.metaService.updateTag({ property: 'og:site_name', content: this.SITE_NAME });

    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: this.titleService.getTitle() });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: image });
  }
}