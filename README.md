# WizScore - Wizard Card Game Scorekeeper

## Features

-   **Atmospheric UI**: Deep, rich gradients and glassmorphism effects.
-   **Smooth Animations**: Context-aware transitions and micro-interactions.
-   **Smart Logic**:
    -   Validates "Total Bids ≠ Round Number" rule (Prophecy phase).
    -   Validates "Total Tricks = Round Number" rule (Outcome phase).
    -   Hides live scores during result entry for maximum suspense.
-   **Premium Inputs**: Large, easy-to-tap touch targets for mobile play.
-   **Interactive Setup**: Swipe-to-delete players.

## Tech Stack

-   **Framework**: React + TypeScript + Vite
-   **Styling**: Tailwind CSS + `clsx` + `tailwind-merge`
-   **Animations**: Framer Motion
-   **Icons**: Lucide React

## Development

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Start dev server**:
    ```bash
    npm run dev
    ```

## Deployment

This project is built with Vite and can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```
