# Netflix-Style React Frontend (TMDB)

This project is a **Netflix-style movie browsing UI** built with **React (Vite)** and the **TMDB API**.  
It is a **front-end only** application that showcases:

- A cinematic hero/banner
- Multiple horizontally scrolling movie rows
- Smooth hover effects and transitions
- Responsive layout for mobile and desktop

---

## Getting Started

### 1. Prerequisites

- **Node.js** (LTS recommended)
- **npm** (comes with Node)
- A **TMDB API key** (free) from [`https://www.themoviedb.org`](https://www.themoviedb.org)

---

### 2. Installation

Clone/open the project folder, then install dependencies:

```bash
npm install
```

---

### 3. TMDB API Key Setup

Create a `.env` file in the project root (same level as `package.json`) and add:

```bash
VITE_TMDB_API_KEY=your_api_key_here
```

- Replace `your_api_key_here` with your actual TMDB API key.
- **Important**: Restart the dev server after changing `.env`.

This key is loaded via `import.meta.env.VITE_TMDB_API_KEY` in the TMDB service file.

---

### 4. Running the App

Start the development server:

```bash
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

---

## Features

- **Navbar**
  - Netflix-style logo (left)
  - Navigation links: Home, TV Shows, Movies
  - Search icon (right)

- **Hero/Banner**
  - Background image from a random **trending** movie
  - Movie title and short overview
  - **Play** and **My List** buttons

- **Movie Rows**
  - Horizontally scrollable rows with movie posters:
    - Trending Now
    - Top Rated
    - Action Movies
    - Comedy Movies
    - Horror Movies
  - Smooth horizontal scrolling with custom scrollbar styling

- **Movie Cards**
  - Poster image
  - On hover:
    - Slight zoom-in effect
    - Dark gradient overlay with movie title

- **Responsive UI**
  - Optimized for both **mobile** and **desktop**
  - Navbar and spacings adjust for smaller screens

- **Loading & Error States**
  - Each row shows a loading label while fetching
  - Basic error messages when TMDB cannot be reached

---

## Tech Stack & Structure

- **React** (Vite)
- **Axios** for API requests
- **Functional components** and **React Hooks** (`useState`, `useEffect`)
- **CSS modules by feature** (no external UI library)

### Main Folders

- `src/components`
  - `Navbar.jsx`, `Navbar.css`
  - `Hero.jsx`, `Hero.css`
  - `Row.jsx`, `Row.css`
  - `MovieCard.jsx`, `MovieCard.css`
- `src/pages`
  - `Home.jsx`, `Home.css`
- `src/services`
  - `tmdb.js` – Axios client + API helpers

---

## TMDB API Usage

The `src/services/tmdb.js` file:

- Creates an **Axios instance** with:
  - Base URL: `https://api.themoviedb.org/3`
  - Common params: `api_key`, `language`
- Exposes helper functions:
  - `fetchTrending()` – trending movies for the week
  - `fetchTopRated()` – top rated movies
  - `fetchByGenre(genreId)` – movies filtered by genre
- Exports `GENRES` map for convenience:
  - Action (28), Comedy (35), Horror (27)
- Exports `IMAGE_BASE_URL` for TMDB images.

---

## Notes

- This project is **front-end only**; there is no backend or authentication.
- All movie data is fetched directly from TMDB at runtime.
- For production, you should keep API keys safer (e.g., via a backend proxy).

---

## Scripts

- `npm run dev` – start dev server
- `npm run build` – build for production
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
