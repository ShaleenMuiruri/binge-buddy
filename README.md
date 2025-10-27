# 🎬 BingeBuddy

A modern, responsive movie discovery platform built with Next.js and The Movie Database (TMDB) API. Discover trending movies, search by title, explore by genre, and curate your personal watchlist.

![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.1-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)

## ✨ Features

- **🎬 Movie Discovery**: Browse popular, trending, top-rated, and upcoming movies
- **🔍 Smart Search**: Debounced search with pagination support
- **🎭 Genre Exploration**: Filter movies by genre with dynamic carousels
- **👤 Authentication**: Google OAuth integration with NextAuth
- **📱 Responsive Design**: Mobile-first approach with smooth animations
- **⚡ Performance**: Optimized with React Query caching and Next.js 15
- **♿ Accessibility**: ARIA labels and keyboard navigation support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn/bun
- TMDB API key ([Get one here](https://www.themoviedb.org/settings/api))
- Google OAuth credentials (optional, for authentication)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/binge-buddy.git
   cd binge-buddy
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Copy the example environment file and fill in your API keys:

   ```bash
   cp env.example .env.local
   ```

   Update `.env.local` with your credentials:

   ```env
   # TMDB API Configuration (required)
   TMDB_BEARER_TOKEN=your_tmdb_bearer_token
   TMDB_BASE_URL=https://api.themoviedb.org/3

   # Google OAuth Configuration (optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_random_secret_here
   ```

4. **Run the development server**

```bash
npm run dev
# or
pnpm dev
# or
   yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Tech Stack

### Core

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **lucide-react** - Icon library
- **Embla Carousel** - Carousel component

### State Management & Data Fetching

- **React Query (TanStack Query)** - Server state management
- **NextAuth.js** - Authentication

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Jest** - Testing framework
- **TypeScript** - Type checking

```

```
