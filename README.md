# 🎬 Netflix-Style React Frontend (TMDB)

This project is a **Netflix-style movie browsing UI** built with **React (Vite)** and the **TMDB API**. It is a **front-end only** application that showcases a cinematic hero/banner, multiple horizontally scrolling movie rows, smooth hover effects and transitions, and a responsive layout for mobile and desktop

---

## 🚀 Getting Started

### 1. Prerequisites

* **Node.js** (LTS recommended)
* **npm** (comes with Node)
* A **TMDB API key** (free) from https://www.themoviedb.org

### 2. Installation

Clone or open the project folder and install dependencies:

```bash
npm install
```

### 3. TMDB API Key Setup

Create a `.env` file in the project root (same level as `package.json`) and add:

```env
VITE_TMDB_API_KEY=your_api_key_here
```

Replace with your real API key and restart the dev server after editing `.env`. The key is accessed via `import.meta.env.VITE_TMDB_API_KEY` inside the TMDB service file.

### 4. Running the App

Start the development server:

```bash
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

---

## ✨ Features

### Navbar

* Netflix-style logo (left)
* Navigation links: Home, TV Shows, Movies
* Search icon (right)

### Hero / Banner

* Background image from a random trending movie
* Movie title and short overview
* Play and My List buttons

### Movie Rows

* Horizontally scrollable rows with movie posters:

  * Trending Now
  * Top Rated
  * Action Movies
  * Comedy Movies
  * Horror Movies
* Smooth horizontal scrolling with custom scrollbar styling

### Movie Cards

* Poster image
* Hover zoom-in effect
* Dark gradient overlay with movie title

### Responsive UI

* Optimized for mobile and desktop
* Layout and spacing adapt to smaller screens

### Loading & Error States

* Loading labels while fetching data
* Basic error messages when TMDB cannot be reached

---

## 🛠 Tech Stack & Structure

* **React (Vite)**
* **Axios** for API requests
* **Functional components** with **React Hooks** (`useState`, `useEffect`)
* **CSS modules by feature** (no external UI library)

### Main Folders

* `src/components` → Navbar.jsx, Hero.jsx, Row.jsx, MovieCard.jsx (+ CSS files)
* `src/pages` → Home.jsx (+ CSS)
* `src/services` → tmdb.js (Axios client + helpers)

---

## 📡 TMDB API Usage

The `src/services/tmdb.js` file:

* Creates an Axios instance with:

  * Base URL: https://api.themoviedb.org/3
  * Common params: `api_key`, `language`
* Provides helper functions:

  * `fetchTrending()` — trending movies for the week
  * `fetchTopRated()` — top rated movies
  * `fetchByGenre(genreId)` — movies filtered by genre
* Exports:

  * `GENRES` map (Action 28, Comedy 35, Horror 27)
  * `IMAGE_BASE_URL` for TMDB images

---

## 📝 Notes

* Front-end only project (no backend or authentication)
* Movie data fetched directly from TMDB at runtime
* For production, API keys should be secured via a backend proxy

---

## 📜 Scripts

* `npm run dev` — start dev server
* `npm run build` — production build
* `npm run preview` — preview production build
* `npm run lint` — run ESLint

---

## ⚛️ React + Vite Template Info

This template provides a minimal setup to run React in Vite with HMR and ESLint.

Available plugins:

* **@vitejs/plugin-react** — Babel (or OXC with rolldown-vite) for Fast Refresh
* **@vitejs/plugin-react-swc** — SWC for Fast Refresh

### React Compiler

The React Compiler is not enabled by default due to performance impact. See https://react.dev/learn/react-compiler/installation to enable it.

### ESLint Expansion

For production apps, using **TypeScript with type-aware lint rules** is recommended. See the React TS template: https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts and typescript-eslint: https://typescript-eslint.io

---

## 👨‍💻 Author

Built as a portfolio project demonstrating modern React UI architecture, API integration, responsive design, and clean component structure.
