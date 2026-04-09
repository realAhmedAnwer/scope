# Scope 🌐

Scope is a modern, fully-featured social media application built with **Angular** and styled beautifully using **Tailwind CSS**. It provides a seamless and responsive platform for users to create posts, interact with friends, and discover new communities.

## ✨ Features

### Authenticated Experience
*   **Secure Authentication**: Fully integrated register and login system using JWT.
*   **Custom User Profiles**: Manage your personal identity, upload responsive profile avatars, and view your account details all in one dedicated space.

### Dynamic Timeline & Engagement
*   **Infinite Scrolling Feed**: Explore endless content with a high-performance timeline that fetches new posts dynamically as you reach the bottom of the page.
*   **Rich Post Creation**: Create posts with customizable privacy levels (Public, Followers, Only Me) and directly upload media (images/videos) natively.
*   **Post Management**: Users can edit their own posts, securely delete them, or alter privacy post-publication.
*   **Full Engagement Control**: interact with any post using instant, optimistic UI updates for:
    *   ❤️ **Likes** (with a dedicated modal to see exactly who liked a post)
    *   💬 **Comments & Threads** (multi-level nested replies on any post)
    *   🔖 **Bookmarks** (save posts into a personalized reading list timeline)
    *   🔄 **Shares**

### Discovery
*   **Sidebar Suggestions**: A dynamic right-side panel that recommends new people to follow with one-click follow integration to expand your social network.
    *   **Targeted Feeds**: Toggle views between "Explore", "Timeline", and "Bookmarks" to easily filter exactly what you want to see.

### Global Experience (i18n)
*   **Multi-language Support**: Fully configured with `ngx-translate`, offering seamless dynamic switching between **English (EN)** and **Arabic (AR)** components.
*   **RTL/LTR Support**: The UI automatically mirrors and respects correct document text flow (`rtl`/`ltr`) based on the active language.

## 🛠️ Technology Stack

*   **Framework**: [Angular 20](https://angular.dev) (Leveraging modern control flow syntax `@if`, `@for`, and `@defer` for optimal loading).
*   **TypeScript Path Aliasing**: Configured clean import architectures (e.g., `@core/`, `@shared/`, `@env/`) to avoid complex relative paths.
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) directly integrated for a responsive, glassmorphic, and highly cohesive UI design.
*   **Icons**: FontAwesome.
*   **Forms**: ReactiveForms for highly robust input validation and handling.
*   **Routing**: Angular Router handling deep-linking and guarded authenticated routes.
*   **Backend API**: Integrated Posts API logic.
*   **Internationalization**: Leveraging `@ngx-translate` for real-time localization.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project root.
2. Install the application dependencies:
```bash
npm install
```

### Development Server
To start the local development server, run:
```bash
npm run dev
# OR 
ng serve
```
Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build
To build the project for production, run:
```bash
npm run build
```
This will compile the application and store the optimized build artifacts in the `dist/` directory.
