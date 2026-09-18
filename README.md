# 🎬 AniFlix

> A modern, responsive anime discovery platform built with React, featuring anime browsing, search, detailed information, watchlists, and watched tracking.


🔗 **Live Demo:** [AniFlix](aniflix-a-82bf.vercel.app)


**AniFlix** is a frontend anime web application designed to provide a smooth and visually engaging experience for discovering and exploring anime. It uses the **AniList GraphQL API** to fetch anime information dynamically and provides client-side watchlist and watched functionality using browser storage.

---

## ✨ Features

* 🏠 **Dynamic Home Page**

  * Featured anime section
  * Trending anime
  * Popular anime
  * Recently updated anime
  * Responsive anime cards

* 🔎 **Anime Search**

  * Search anime by title
  * Dynamic search results
  * Infinite scrolling / pagination
  * Loading states

* 📖 **Anime Overview**

  * Anime poster and banner
  * Title information
  * Description
  * Genres
  * Ratings
  * Characters
  * Trailer information
  * Recommendations

* ❤️ **Watchlist**

  * Add anime to your personal watchlist
  * Remove anime from watchlist
  * Persistent data using LocalStorage

* ✅ **Watched**

  * Mark anime as watched
  * Remove anime from watched list
  * Persistent browser storage

* 📱 **Responsive Design**

  * Desktop
  * Tablet
  * Mobile
  * Adaptive navigation and layouts

* 🎨 **Modern UI**

  * Dark anime-inspired theme
  * Glassmorphism elements
  * Smooth animations
  * Interactive hover states
  * Skeleton loading states
  * Custom SVG icons and components

* ⚡ **Performance-focused UI**

  * Lazy loading where appropriate
  * Optimized image assets
  * WebP image format
  * Reusable React components
  * Efficient API requests

---

## 🛠️ Tech Stack

### Frontend

* **React** — Component-based UI development
* **React Router** — Client-side routing and navigation
* **Tailwind CSS** — Utility-first styling
* **DaisyUI** — Reusable Tailwind UI components
* **Motion** — Animations and transitions
* **JavaScript (ES6+)** — Application logic

### API & Data

* **AniList GraphQL API** — Anime data and metadata
* **GraphQL** — Efficient API queries
* **Fetch API** — Communication with the AniList API
* **LocalStorage** — Client-side persistence for watchlist and watched data

### Development Tools

* **Vite** — Fast development environment and build tool
* **Git** — Version control
* **GitHub** — Source code hosting and project management
* **ESLint** — Code quality and consistency

---

## 🏗️ Project Structure

```text
AniFlix/
│
├── public/
│
├── src/
│   ├── assets/
│   │   ├── BackgroundImages/
│   │   ├── icons/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── AnimeCard.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   │
│   ├── hooks/
│   │   └── useAnimeInfo.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Search.jsx
│   │   ├── Overview.jsx
│   │   ├── Watchlist.jsx
│   │   └── Watched.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
│
├── package.json
├── vite.config.js
└── README.md
```

> The exact folder structure may evolve as the project grows.

---

## 🔄 How AniFlix Works

AniFlix retrieves anime information from the **AniList GraphQL API**.

The general data flow is:

```text
User
  │
  ▼
React UI
  │
  ▼
React Components
  │
  ▼
Custom Anime Hook
  │
  ▼
GraphQL Query
  │
  ▼
AniList API
  │
  ▼
Anime Data
  │
  ▼
React State
  │
  ▼
UI Update
```

For local user features:

```text
User Action
     │
     ▼
React State
     │
     ▼
LocalStorage
     │
     ▼
Persistent Watchlist / Watched Data
```

---

## 🎨 Design

AniFlix uses a dark, cinematic interface inspired by modern streaming platforms.

### Main Theme

```text
Background: #050B18
Accent:     #54E1E6
```

The interface uses:

* Dark backgrounds
* Cyan accent colors
* Gradient overlays
* Glass-style navigation
* Rounded cards
* Smooth transitions
* Responsive layouts

The design focuses on keeping the interface visually rich without making it difficult to navigate.

---

## 📱 Responsive Design

AniFlix is designed to work across different screen sizes.

| Device      | Experience                               |
| ----------- | ---------------------------------------- |
| 🖥️ Desktop | Full navigation and multi-column layouts |
| 💻 Laptop   | Adaptive content spacing                 |
| 📱 Tablet   | Responsive grids and navigation          |
| 📱 Mobile   | Mobile navigation and optimized cards    |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/aniflix.git
```

### 2. Navigate to the project

```bash
cd aniflix
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL shown by Vite.

---

## 📦 Build for Production

Create a production build using:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 🔑 API

AniFlix uses the **AniList GraphQL API** for anime information.

The application communicates with:

```text
https://graphql.anilist.co
```

No API key is required for the public AniList GraphQL API.

---

## 🧩 Key React Concepts Used

This project was built to practice and demonstrate real-world React development concepts, including:

* Functional components
* Props
* React Hooks
* `useState`
* `useEffect`
* `useMemo`
* `useRef`
* Custom Hooks
* Conditional rendering
* Component reusability
* React Router
* Dynamic routes
* URL search parameters
* API integration
* Loading and error states
* Client-side state management
* LocalStorage
* Responsive UI development

---

## 🎯 Project Goals

AniFlix was created as a practical project to strengthen frontend development skills by combining:

* React development
* API integration
* Responsive UI design
* Client-side routing
* State management
* Animations
* Reusable component architecture
* Real-world application structure

The project is also designed with future backend integration in mind, allowing local watchlist and watched data to eventually be migrated to a server-based system.

---

## 🔮 Future Improvements

Planned improvements include:

* [ ] Backend integration
* [ ] User authentication
* [ ] Cloud-based watchlist synchronization
* [ ] Advanced anime filters
* [ ] Genre-based discovery
* [ ] User profiles
* [ ] Reviews and ratings
* [ ] Progressive Web App (PWA) support
* [ ] Further performance optimization

---

## ⚠️ Disclaimer

AniFlix is a personal portfolio/learning project.

Anime metadata and related information are provided through the **AniList API**. AniFlix does not host or distribute copyrighted anime content.

---

## 👨‍💻 Author

**Tushar Chaudhary**

Built as a frontend development project to explore modern React development, API integration, responsive design, and interactive web applications.

---

## ⭐ Support

If you found the project interesting, consider giving the repository a ⭐ on GitHub.
