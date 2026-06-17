# ShareGear MVP - Project Structure & Architecture

## Overview
ShareGear MVP Frontend is a premium, enterprise-grade web application built entirely using **Vanilla HTML5, CSS3, and ES6+ JavaScript**. It strictly avoids modern frameworks (React, Angular, Vue) and CSS libraries (Tailwind, Bootstrap) while maintaining a modern "SaaS/Industrial" aesthetic with Dark Mode and RTL (Arabic) support.

## Architecture Pattern
To handle the scale of a 70+ page application without frameworks, the project utilizes **Vanilla Web Components (`customElements.define`)** for structural reuse and a **Mock API Layer** using JSON files.

### Directory Structure
```
/
├── index.html                  # Main Landing Page
├── css/
│   ├── variables.css           # Design system tokens (colors, spacing, fonts)
│   ├── base.css                # CSS reset and base typography
│   ├── components.css          # Styles for buttons, cards, badges, toasts
│   └── layouts.css             # Complex grid layouts for dashboards/navbars
├── js/
│   ├── app.js                  # Global logic (Theme, Animations, Toasts)
│   ├── api.js                  # Mock fetch layer simulating network latency
│   └── components/             # Reusable Vanilla Web Components
│       ├── app-navbar.js       # Global top navigation
│       ├── app-sidebar.js      # Contextual sidebar (Customer/Provider/Admin)
│       └── app-footer.js       # Enterprise footer
├── data/                       # Mock API JSON responses
│   ├── equipment.json
│   ├── providers.json
│   ├── bookings.json
│   └── messages.json
└── pages/                      # All application routes/pages
```

## Modules & Pages Developed

### 1. Core & Customer Side
- `index.html`: Landing page with AI Search hero and featured providers.
- `pages/login.html`: Authentication entry.
- `pages/register.html`: Role-based signup (Customer vs Provider).
- `pages/otp-verification.html`: Security verification step.
- `pages/forgot-password.html`: Password recovery flow.
- `pages/dashboard.html`: Customer portal showing active bookings, wallet balance, and AI recommendations.
- `pages/search-results.html`: Search interface with advanced side-filters.
- `pages/service-categories.html`: Visual grid of available service types.
- `pages/service-details.html`: Deep dive into a specific machine/service with provider details.
- `pages/booking-wizard.html`: Complex 4-step booking process with progress tracking.
- `pages/booking-success.html`: Post-booking confirmation.
- `pages/bookings.html`: Historical table of user bookings.
- `pages/booking-details.html`: Detailed view of a single booking featuring a vertical status timeline.
- `pages/wallet.html`: Financial dashboard for the user.
- `pages/payment-methods.html`: Management of saved cards.
- `pages/saved-addresses.html`: Management of frequent job sites.
- `pages/reviews.html`: User's rating and received reviews.
- `pages/profile.html`: Personal information management.
- `pages/settings.html`: System preferences and danger zones.
- `pages/notifications.html`: List of system alerts.
- `pages/messages.html`: Split-pane chat interface.

### 2. Marketplace Module
- `pages/marketplace.html`: Dedicated hub for buying/selling equipment (new and used).
- `pages/product-details.html`: E-commerce view for a specific product.
- `pages/purchase-flow.html`: Checkout experience with dynamic summary.
- `pages/purchase-confirmation.html`: Post-purchase success screen.
- `pages/orders.html`: Track purchased assets.
- `pages/order-tracking.html`: Visual multi-step tracker for physical delivery.
- `pages/wishlist.html`: Saved products.
- `pages/offers.html`: Negotiation interface for used equipment.

### 3. Provider Module
- `pages/provider-dashboard.html`: High-level overview of revenue, active jobs, and trust score (SVG meter).
- `pages/equipment.html`: Fleet management grid.
- `pages/create-listing.html`: Form to add new machines to the marketplace or rental pool.
- `pages/operators.html`: Staff/Technician management.
- `pages/booking-requests.html`: Inbox for incoming customer booking requests with Accept/Reject actions.
- `pages/active-jobs.html`: Live tracking of machines currently deployed on sites.
- `pages/earnings.html`: Financial tracking with a CSS-based Bar Chart mock.

### 4. Admin Command Center
- `pages/admin.html`: Master overview with Kill Switch, Risk Meters, and live transaction streams.
- `pages/ai-config.html`: Control panel for tuning the matchmaking algorithm and dynamic pricing limits.
- `pages/disputes.html`: Resolution center for conflicts between customers and providers.
- `pages/escrow.html`: Monitoring of funds held in trust before job completion.

## Technical Highlights
1.  **Component Architecture:** `<app-navbar>`, `<app-sidebar>`, and `<app-footer>` drastically reduce DOM duplication.
2.  **No Frameworks:** Everything runs natively in the browser using the DOM API.
3.  **Theming:** Implemented a robust CSS Variable system supporting instant Light/Dark mode toggling via `data-theme`.
4.  **Mock Backend:** The `api.js` file uses native Promises to simulate API latency, proving out loading states (skeleton loaders defined in CSS) before data paints.
5.  **RTL First:** Developed primarily in Arabic (`dir="rtl"`) with proper logical properties for spacing.
