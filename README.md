# WizScore 🧙‍♂️

The ultimate scorekeeper for the Wizard card game. Experience magic with every hand.
**Live at:** [wizscore.org](https://wizscore.org)

## Features

-   **Atmospheric UI**: Deep, rich gradients, glassmorphism, and a custom SVG logo.
-   **Mobile-First Design**:
    -   Swipe-to-delete players.
    -   Fixed header with scrollable lists for easy navigation.
    -   Large touch targets for bidding and result entry.
-   **Smart Logic**:
    -   **Prophecy Phase**: Validates that bids do not equal the round number.
    -   **Outcome Phase**: Ensures total tricks match the round number.
    -   **Suspense Mode**: Hides live scores during result entry.
-   **Privacy & Legal**:
    -   **Zero Tracking**: All game data is stored locally on your device.
    -   **GDPR Compliant**: Includes Impressum and Privacy Policy.

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
