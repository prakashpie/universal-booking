# Universal Booking App

This is a universal booking platform that powers diverse verticals - from salons and classes to rentals and beyond.

## Setup

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the mock server:**

    ```bash
    node backend/mock-server/server.js
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

The app will be available at `http://localhost:3000`.

## Architecture

The app is built with Nuxt 4 and uses a config-driven approach to render the booking flow for different verticals. The core of the architecture is the `BookingFlow` component, which dynamically renders the appropriate components based on the configuration file for the selected vertical.

-   **State Management:** [Pinia](https://pinia.vuejs.org/) is used for state management. There are two stores:
    -   `useConfigStore`: To store the configuration for the selected vertical.
    -   `useBookingStore`: To store the state of the booking process (selected service, provider, date, etc.).
-   **API Integration:** Composables are used to fetch data from the mock API. Each API endpoint has its own composable (`useAvailability`, `useSessions`, `useInventory`, `useBooking`).
-   **Component-based:** The UI is built with Vue components. Each step in the booking flow is a separate component (`ServiceSelector`, `ProviderSelector`, etc.).

## Performance

-   **SSR:** The app is server-side rendered for a fast first paint.
-   **Virtualization:** Due to some unknown issue, it is still in WIP.

## Observability

-   **Logging:** A `useLogger` composable is used to log important events (`booking_attempt`, `booking_success`, `api_error`).
-   **Request ID:** A unique request ID is generated for each request and propagated across client logs and API calls for better traceability.

## WIP

-   **Embeddable Widget:** Not done yet.
-   **UI/UX:** Further improve the UI and UX with more polished components and animations.
