
# Product Explorer

A Web app that displays a list of products with filtering, detailed views, and a simple client-side state feature.



## Features

- **Search**: Real-time client-side search across 20+ products with sub-100ms response time
- **Categories**: Browse products across **4 categories** with dynamic filtering
- **Product Detail View**: Click any product to view complete details in a modal-style interface
- **Performace Optimized**: Optimized rendering and filtering for smooth UI interactions
- **Fully Responsive Design**: Seamless experience across **mobile, tablet, desktop** devices

## Demo

https://productexplorercatalogue.netlify.app/

## Tech Stack


| Category   | Technologies            |
| ---------- | ----------------------- |
| Framework  | Next.js 14 (App Router) |
| Language   | TypeScript              |
| Styling    | Tailwind CSS            |
| Data       | Fake Store API          |
| Tools      | ESLint, Prettier        |
| Deployment | Vercel / Netlify        |

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm 


## Run Locally

Clone the project

```bash
  git clone https://github.com/saisiri6803/product-explorer.git 
```

Go to the project directory

```bash
  cd product-explorer
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Assumptions & Trade-offs

- Client-Side Filtering
  All products are fetched upfront and filtered on client for simplicity and fast UI interactions.
  Trade-off: Not ideal for very large datasets; server-side filtering would scale better.
- External API Dependency
  Uses Fake Store API for product data.
  Trade-off: API availability and data consistency depend on a third-party service.
- State Management Choice
  Lightweight client-side state instead of REdux or server state libraries.
  Trade-off:Keeps complexity low but may need refatoring for larger applications.
- No Authentication
  Application focuses purely on product browsing
  Trade-off: Authentication and user-specific features are intentially out of scope

## Future Improvements
- Server-side filtering and pagination
- Accessibility enchancements (ARIA roles, keyboard navigation)
- Unit and integration tests
- Persistent user preferences
- light/dark mode toggle
   



## Authors

- [@saisiri6803](https://www.github.com/saisiri6803)

<div align='center'>
<img
src ="https://img.shields.io/badge/Next.js-15-blue?style=flat&logo=next.js" alt="Next.js">
<img
src ="https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat&logo=tailwindcss" alt="Tailwind">
<img
src ="https://img.shields.io/badge/TypeScript-3178c6?style=flat&logo=typescript" alt="TypeScript">
</div>

