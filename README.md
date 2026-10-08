# 🍔 Burger Lions

A modern, production-ready restaurant website built with **Angular 16** — featuring PWA support, SEO optimization, dark/light theme, and a fully responsive design.

🌐 **Live Demo:** [angular-beta-eight-80.vercel.app](https://angular-beta-eight-80.vercel.app/)

---

## ✨ Features

- 🎨 **Modern Angular 16** — Standalone components, signals, `OnPush` change detection
- 📱 **PWA (Progressive Web App)** — Offline support, installable on mobile
- 🌓 **Dark / Light Theme** — Persisted preference, system detection
- 🔍 **SEO Optimized** — Meta tags, Open Graph, Twitter Cards, JSON-LD structured data
- ♿ **Accessible** — ARIA labels, skip links, keyboard navigation
- 📝 **Booking Form** — Reactive Forms with custom validators
- 🍔 **66-Item Menu** — Filterable by category (burgers, sides, drinks, desserts)
- 🎠 **Custom Carousel** — Auto-play, pause-on-hover, responsive
- 📊 **Performance** — Lazy images, optimized bundle (~604 KB gzipped)
- 🌍 **Responsive** — Mobile-first design, tested on all breakpoints

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Angular 16.2 |
| **Language** | TypeScript 5.1 |
| **Styling** | CSS Variables, Bootstrap 5 |
| **PWA** | Angular Service Worker |
| **Forms** | Reactive Forms |
| **State** | Angular Signals |
| **Testing** | Jasmine + Karma |
| **Deployment** | Vercel |

---

## 📦 Getting Started

### Prerequisites

- **Node.js** 18.10+ ([download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/githwizardn/Restaurant.git
cd Restaurant

# 2. Install dependencies
npm install

# 3. Start dev server
npm start
```

Open **http://localhost:4200** in your browser.

---

## 🏗️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server on `localhost:4200` |
| `npm run build` | Production build → `dist/burger-lions/` |
| `npm test` | Run unit tests (Karma) |
| `npm run watch` | Build in watch mode (development) |

### Production Build

```bash
ng build --configuration production
```

**Output**: `dist/burger-lions/` with hashed filenames, service worker, and optimized bundle.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── about/                 # "About us" section
│   ├── booking-form/          # Reservation form
│   ├── card-carousel/         # Best dishes carousel
│   ├── data/                  # Menu data (66 items, images)
│   ├── footer/                # Contact + map
│   ├── handlers/              # Global error handler
│   ├── menu/                  # Menu with filter tabs
│   ├── navbar/                # Navigation + theme toggle
│   ├── services/
│   │   ├── booking.service.ts
│   │   ├── scroll.service.ts
│   │   ├── seo.service.ts
│   │   └── theme.service.ts
│   ├── team/                  # Chef team
│   ├── app.component.ts
│   └── main.ts
├── assets/
│   ├── icons/                 # PWA icons (8 sizes)
│   └── ...
├── environments/              # Dev + prod config
├── styles.css                 # Global styles + theme variables
├── manifest.webmanifest       # PWA manifest
├── robots.txt
└── sitemap.xml
```

---

## 🎨 Theme System

The app uses **CSS variables** for theming. Switch between dark and light mode with the toggle in the navbar.

```css
:root {
  --color-bg: #000;
  --color-text: #fff;
  --color-accent: #ffcc33;
}

[data-theme="light"] {
  --color-bg: #f7f5f0;
  --color-text: #1a1a1a;
  --color-accent: #d49a00;
}
```

Theme preference is saved to `localStorage` and falls back to system preference.

---

## 📱 PWA Features

- **Installable** — Add to home screen on mobile
- **Offline-ready** — Service Worker caches app shell and images
- **App shortcuts** — Direct links to Menu and Booking

### Testing PWA Locally

```bash
# Build production
ng build --configuration production

# Serve locally
cd dist/burger-lions
npx http-server -p 8080
```

Open **http://127.0.0.1:8080** — Service Worker activates automatically.

> ⚠️ PWA works on `localhost` and `https://` only. LAN IP (e.g., `192.168.x.x`) won't work.

---

## 🚀 Deployment

### Vercel (Recommended)

The project is optimized for **Vercel** — zero configuration required.

1. Push to GitHub
2. Import repo on [vercel.com/new](https://vercel.com/new)
3. Vercel auto-detects Angular → Deploy

**Build settings** (auto-detected):
- **Framework:** Angular
- **Build Command:** `ng build --configuration production`
- **Output Directory:** `dist/burger-lions`

### Other Platforms

| Platform | Build Command | Output |
|----------|--------------|--------|
| **Netlify** | `ng build --configuration production` | `dist/burger-lions` |
| **GitHub Pages** | `ng build --configuration production --base-href=/repo-name/` | `dist/burger-lions` |
| **Cloudflare Pages** | `ng build --configuration production` | `dist/burger-lions` |

---

## 🔧 Configuration

### Environment Variables

Edit `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod):

```typescript
export const environment = {
  production: false,
  bookingEndpoint: 'REPLACE_WITH_YOUR_ENDPOINT',  // Formspree / API URL
  apiUrl: 'http://localhost:3000/api',
  siteUrl: 'https://your-domain.com',
  phone: '+995322560907',
  whatsappNumber: '995322560907',
};
```

### Booking Form

Currently in **demo mode** (no real submission). To enable real bookings:

1. Create account on [Formspree](https://formspree.io) (free tier: 50/month)
2. Copy your endpoint URL (e.g., `https://formspree.io/f/xyzabc`)
3. Paste into `environment.bookingEndpoint`
4. Rebuild: `npm run build`

---

## 🧪 Testing

```bash
# Unit tests
npm test

# Coverage
ng test --code-coverage
```

---

## 📝 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 👤 Author


- GitHub: [@githwizardn](https://github.com/githwizardn)

---

## ⚠️ Disclaimer

This is a **portfolio / educational project**. Not affiliated with any real restaurant business. Images used are from [Unsplash](https://unsplash.com) and the original [burgerlions.com](https://burgerlions.com) website for demonstration purposes only.

---

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) — free stock photos
- [Angular](https://angular.dev) — framework
- [Vercel](https://vercel.com) — hosting
- [PWA Builder](https://www.pwabuilder.com) — icon generator

---

<div align="center">

**Built with ❤️ using Angular 16**

⭐ Star this repo if you found it helpful!

</div>