
# Universal Booking App - TODO

This document outlines the steps to build the Universal Booking App as described in the PRD.

## Phase 1: Project Setup & Configuration

1.  **Initialize Nuxt 3 Project:** Set up a new Nuxt 3 project.
2.  **Install Dependencies:**
    *   `tailwindcss`: For utility-first CSS styling.
    *   `shadcn-ui`: For UI components.
    *   `@nuxtjs/tailwindcss`: Nuxt module for Tailwind CSS.
    *   `lucide-vue-next`: Icons for shadcn-ui.
3.  **Configure Tailwind CSS:**
    *   Initialize `tailwind.config.js`.
    *   Configure `tailwind.config.js` to work with shadcn-ui.
    *   Create a `main.css` file to include Tailwind directives.
4.  **Configure shadcn-ui:**
    *   Initialize shadcn-ui using the CLI.
    *   Configure `components.json` to define the alias for components.
5.  **Project Structure:**
    *   Create directories for `components`, `composables`, `server`, `store`, and `types`.

## Phase 2: Config-Driven UI

1.  **Create Config Store:**
    *   Use Pinia or a similar state management library to store the configuration fetched from the API.
    *   Create a composable `useConfig` to access the config throughout the app.
2.  **Dynamic Component Rendering:**
    *   Create a `BookingFlow` component that dynamically renders the booking steps based on the `layout.flow` from the config.
    *   Create individual components for each step:
        *   `ServiceSelector.vue`
        *   `ProviderSelector.vue`
        *   `TimeslotSelector.vue`
        *   `SessionSelector.vue`
        *   `DateRangeSelector.vue`
        *   `ItemSelector.vue`
3.  **Theming:**
    *   Create a `useTheme` composable that applies the `branding.theme` colors from the config to the UI using CSS variables.

## Phase 3: Booking Logic & API Integration

1.  **API Composables:**
    *   Create composables for each API endpoint:
        *   `useAvailability.ts`: To fetch availability for salons.
        *   `useSessions.ts`: To fetch sessions for classes.
        *   `useInventory.ts`: To fetch inventory for rentals.
        *   `useBooking.ts`: To make a booking.
2.  **State Management:**
    *   Create a `useBooking` store to manage the state of the booking process (selected service, provider, date, etc.).
3.  **Implement Booking Flows:**
    *   **Salon:**
        1.  Select Service -> 2. Select Provider -> 3. Select Timeslot
    *   **Class:**
        1.  Select Session
    *   **Rental:**
        1.  Select Date Range -> 2. Select Item

## Phase 4: SSR & Performance

1.  **Server-Side Rendering:**
    *   Ensure all data fetching is done on the server-side using Nuxt's `useAsyncData` or `useFetch`.
    *   Verify that the initial render is complete and there are no layout shifts.
2.  **Performance Optimization:**
    *   Implement virtualization for long lists (e.g., timeslots, sessions) using a library like `vue-virtual-scroller`.
    *   Memoize expensive computations where applicable.
    *   Analyze bundle size and LCP.

## Phase 5: Observability & Error Handling

1.  **Logging:**
    *   Implement a logging service that captures `booking_attempt`, `booking_success`, and `api_error` events.
    *   Propagate a `request-id` across client logs and API calls.
2.  **Error Handling:**
    *   Implement graceful error handling for API failures (e.g., show a toast notification).
    *   Create loading and error states for all data-fetching components.

## Phase 6: Embeddable Widget

1.  **Create Widget Script:**
    *   Create a `widget.js` script that can be embedded on any page.
    *   The script should:
        *   Read the `data-config` attribute from the container element.
        *   Fetch the config file.
        *   Mount the Nuxt app in the container element.
2.  **Widget-Specific Build:**
    *   Configure the Nuxt build to produce a standalone widget bundle.

## Phase 7: UX & A11y

1.  **Accessibility:**
    *   Ensure all components are keyboard accessible.
    *   Use ARIA roles where appropriate.
2.  **UX:**
    *   Implement clear loading and error states.
    *   Ensure the booking flow is intuitive and user-friendly.

## Phase 8: Documentation

1.  **Update `README.md`:**
    *   Add setup and run instructions.
    *   Document architecture decisions and trade-offs.
    *   Include performance measurements.
    *   Describe the observability approach.
    *   Add a "What's next" section.

## Phase 9: use of shadcn (✓)

1.  **Update whole website with shadcn ui components:**
    *   Replace all possible ui components to shadcn components .

## Phase 10: make a proper nuxt page for all required flows (✓)