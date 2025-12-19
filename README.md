# Sruthi & Rahul Wedding Website

A modern, responsive, and aesthetic wedding website built with **React**, **TypeScript**, and **Tailwind CSS**.

## Features

- **Hero Section**: Full-screen background with a live countdown timer to the wedding date.
- **Our Story**: A dedicated section introducing the bride and groom.
- **Event Details**: Schedule of events including Engagement, Wedding, and Receptions.
- **Gallery**: Interactive image carousel.
- **Locations**: Integrated Google Maps embeds for venue locations.
- **RSVP System**: Functional form to collect guest responses (stores data locally for demo purposes).
- **Contact**: Contact information and inquiry form.

## Tech Stack

- **React 19**: UI Library.
- **TypeScript**: Type safety.
- **Tailwind CSS**: Styling (loaded via CDN).
- **Framer Motion**: Animations.
- **Lucide React**: Icons.
- **ES Modules**: No build step required (Vite/Webpack not needed for this specific setup).

## How to Run Locally

Since this project uses ES Modules directly in the browser via an `importmap`, you cannot simply open the `index.html` file directly from your file system (e.g., `file://...`). It must be served over `http://` or `https://` to avoid CORS and module security errors.

### Option 1: Using Node.js (npx)

If you have Node.js installed, the easiest way is to use `http-server`:

1.  Open your terminal in the project root directory.
2.  Run the following command:
    ```bash
    npx http-server .
    ```
3.  Open the URL provided in the terminal (usually `http://127.0.0.1:8080`) in your browser.

### Option 2: Using Python

If you have Python installed:

1.  Open your terminal in the project root directory.
2.  Run:
    ```bash
    # Python 3
    python3 -m http.server
    ```
3.  Open `http://localhost:8000` in your browser.

### Option 3: VS Code Live Server

If you use Visual Studio Code:

1.  Install the **Live Server** extension by Ritwick Dey.
2.  Right-click `index.html` in the file explorer.
3.  Select "Open with Live Server".

## Project Structure

- `index.html`: Entry point, contains the import map and Tailwind script.
- `index.tsx`: React entry point.
- `App.tsx`: Main application component.
- `components/`: UI components (Hero, Story, Gallery, etc.).
- `services/`: API simulation logic.
- `types.ts`: TypeScript interfaces.

## Customization

To change the wedding date:
1.  Open `components/Hero.tsx`.
2.  Update the `targetDate` variable in the `useEffect` hook.
3.  Update the display text in the JSX.
