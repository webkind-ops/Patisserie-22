# Patisserie'22 - Digital QR Menu (Phase 1)

Clean, modular, mobile-first Digital Menu application built with React, TypeScript, Vite, Tailwind CSS, and Lucide Icons for **Patisserie'22**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The app will run at `http://localhost:5173`. Navigating to `/` will automatically redirect to `/menu`.

### 3. Generate / Update QR Code
```bash
npm run generate-qr
```
This reads the menu URL from configuration (`src/constants/appConfig.ts`) and outputs `public/qr/menu-qr.png`.

---

## 🎨 Theme & Design System

The application uses a **Lavender-inspired palette** driven entirely by CSS custom properties in [`src/styles/index.css`](src/styles/index.css):

* `--color-primary-lavender` (`#7E69AB`)
* `--color-soft-lavender` (`#EAE4F2`)
* `--color-lavender-accent` (`#574281`)
* `--color-lavender-deep` (`#3A2B56`)
* `--color-cream` (`#FAF7F2`)
* `--color-off-white` (`#FFFFFF`)
* `--color-dark-charcoal` (`#1E1B24`)
* `--color-muted-gray` (`#6B6875`)

No colors are hardcoded inside components.

---

## 📱 Mobile-First Ergonomics

- Touch targets are minimum 44px / 48px.
- Momentum scrolling with `-webkit-overflow-scrolling: touch`.
- Zero horizontal overflow or clipped layouts on Android & iOS viewports.
- Responsive grid (1 col on mobile, 2 col on tablet, 3 col on desktop).

---

## 📂 Project Architecture

```
qr-menu/
├── public/
│   ├── qr/
│   │   └── menu-qr.png            # Generated QR pointing to configured URL
│   └── placeholders/              # Swap-ready SVG placeholders
├── src/
│   ├── components/
│   │   ├── common/                # Reusable UI primitives (Button, Badge, SearchBar, SectionTitle, EmptyState)
│   │   ├── layout/                # Layout shell, Header, Footer
│   │   └── menu/                  # Menu domain components (CategoryTabs, ProductCard, ProductGrid, FeaturedSection)
│   ├── constants/
│   │   ├── appConfig.ts           # Store profile, WhatsApp, opening hours & QR URL target
│   │   └── categories.ts          # 12 categories definition
│   ├── data/
│   │   └── menu.json              # Local menu items data source
│   ├── hooks/
│   │   ├── useMenu.ts             # Decoupled menu filtering, searching, dietary filters & counts
│   │   └── useDebounce.ts         # Fast search input debounce
│   ├── pages/
│   │   ├── MenuPage.tsx           # Primary Digital Menu page
│   │   └── NotFoundPage.tsx       # 404 page
│   ├── routes/
│   │   └── AppRoutes.tsx          # React Router definition (/ -> /menu)
│   ├── styles/
│   │   └── index.css              # Lavender CSS variables & touch base layer
│   ├── types/
│   │   ├── menu.ts                # Domain types & interfaces
│   │   └── common.ts              # Store & config types
│   ├── utils/
│   │   ├── cn.ts                  # Tailwind class merge utility
│   │   ├── formatters.ts          # Currency, dietary badges & WhatsApp link builders
│   │   └── qrGenerator.ts         # Dynamic QR generator helper
│   ├── App.tsx
│   └── main.tsx
├── scripts/
│   └── generate-qr.js             # Node.js CLI script for QR code generation
└── package.json
```

---

## 🔄 Replacing Data in Future Phases

When official bakery assets arrive (`menu_info.xlsx`, photos, logo):
1. **Menu items & prices**: Update [`src/data/menu.json`](src/data/menu.json).
2. **Photographs**: Add images to `public/images/` or `src/assets/` and update paths in `menu.json`.
3. **Store info & Production Domain**: Update [`src/constants/appConfig.ts`](src/constants/appConfig.ts).
4. **Regenerate QR**: Run `npm run generate-qr`.

No component code modifications will be required.
