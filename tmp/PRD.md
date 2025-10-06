we are building a universal booking platform that powers diverse verticals -
from salons and classes to rentals and beyond. As a Lead Frontend Engineer, your challenge is
to demonstrate how you’d build a config-driven, SSR-first booking interface that adapts to
different business needs while staying performant, observable, and user-friendly.

The Problem to Solve
We need a booking page + embeddable widget that can flexibly adapt to multiple verticals
using configuration only (no forks):
1. Salon → Services, providers, per-slot scheduling.
2. Class/Workshop → Fixed start times, seat capacity.
3. Rental → Date-range reservations with inventory count.
   Your task: Implement a Nuxt 3 app (or another SSR-first modern frontend framework if you
   prefer) that reads a JSON config and renders the appropriate booking flow.



Requirements
1) SSR + Hydration
   ● Render the booking page server-side for first paint (no empty shell).
   ● Hydrate progressively; avoid layout shifts.
   ● Use CSS variables for theming (colors, fonts) from config.

2) Universal Booking Flows
   ● Salon: Pick service → provider → timeslot.
   ● Class: Pick session, see seats left, join.
   ● Rental: Pick item → date range → see inventory.
   ● Respect constraints in configs (lead times, horizons, overlaps).

3) Performance
   ● Page should feel snappy with 1,000+ events/sessions.
   ● Show at least one performance optimization (e.g., virtualization, memoization).
   ● Document bundle size and measure LCP locally.

4) Observability
   ● Propagate a request-id across client logs and API calls.
   ● Log booking_attempt, booking_success, api_error as structured logs.
   ● Handle mock API failures (latency, 500s) gracefully.

HTML
5) Embeddable Widget
   ● Deliver a simple <script> snippet that mounts the booking widget on any page:

<div id="ghl-booking" data-config="/configs/salon.json"></div>
<script src="/widget.js" async></script>

● It should fetch config, render SSR output, and hydrate interactions.
6) UX & A11y
   ● Loading and error states.
   ● Keyboard accessibility for navigation.
   ● ARIA roles for lists/grids.

📦 Deliverables
1. Codebase in a GitHub repo (or zipped project) with:
   ○ README.md describing:
   ■ Setup & run instructions.
   ■ Architecture decisions & trade-offs.
   ■ Performance measurements (bundle, LCP).
   ■ Observability approach.
   ■ “What would I do next if this went to production?”
   ○ Config-driven implementation: one codepath works for all three verticals.
   SSR booking page and embeddable widget.