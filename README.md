# Marketing Campaign Analytics Dashboard (MVP)

Enterprise-style Marketing Campaign Analytics Dashboard built with **React + TypeScript (Vite)**.

This is an MVP inspired by Sailthru-style campaign platforms.

## Features

- **Campaign listing**
  - Fetches campaigns from a **mock REST API** via Axios
  - Uses **TanStack React Query** for caching/loading/error states
  - Premium dashboard UI with responsive layout

- **Campaign details** (`/campaign/:id`)
  - Displays campaign metrics (audience, open rate, click rate, revenue)
  - Includes an analytics **line chart** (Recharts) showing a 7-day open-rate trend

- **Audience segment builder** (`/segments`)
  - Simple segment form (Country + Engagement Level)
  - **Admin** can save segments
  - **Viewer** has read-only access (controls disabled)

- **Role-based access control (RBAC)**
  - Role stored in **Redux Toolkit** global state: `admin | viewer`
  - Role switcher in the navbar (for MVP/demo)

- **Audit logging**
  - Logs user actions to the console via `auditLogger(action)`
  - Actions tracked:
    - `viewed dashboard`
    - `opened campaign`
    - `created segment`

- **Performance**
  - `React.memo` for `CampaignCard`
  - `useMemo` for derived chart + dropdown data
  - `useCallback` for handlers

## Tech Stack (exact)

- React + TypeScript (Vite)
- React Router
- Axios
- TanStack React Query
- Redux Toolkit
- TailwindCSS
- Recharts

## Getting Started

### 1) Install

```bash
npm install
```

### 2) Run dev server

```bash
npm run dev
```

Open:

- http://localhost:5173/

### 3) Production build

```bash
npm run build
npm run preview
```

## Routing

- `/` → Dashboard
- `/campaign/:id` → Campaign Details
- `/segments` → Segment Builder

## Mock API

There is no backend.

Mock data is stored in `src/api/campaignApi.ts` and served through Axios using a request `adapter` with `Promise + setTimeout` delay.

### Campaign type

```ts
type Campaign = {
  id: string;
  name: string;
  audienceSize: number;
  openRate: number;
  clickRate: number;
  revenue: number;
};
```

### "Secure" API simulation

An Axios interceptor injects a mock auth header:

- `Authorization: Bearer mock-token`

See: `src/api/axiosClient.ts`.

## Audit Logging

All audit logs are written to the browser console.

File:

- `src/utils/auditLogger.ts`

## Project Structure

Required structure implemented:

```text
src/
├── api/
│   ├── axiosClient.ts
│   └── campaignApi.ts
│
├── components/
│   ├── Navbar.tsx
│   ├── CampaignCard.tsx
│   ├── MetricsChart.tsx
│   └── ProtectedRoute.tsx
│
├── pages/
│   ├── Dashboard.tsx
│   ├── CampaignDetails.tsx
│   └── SegmentBuilder.tsx
│
├── store/
│   ├── store.ts
│   └── userSlice.ts
│
├── hooks/
│   └── useCampaigns.ts
│
├── utils/
│   └── auditLogger.ts
│
├── routes/
│   └── AppRoutes.tsx
│
├── App.tsx
└── main.tsx
```

## Notes

- The UI is styled as a premium dark enterprise dashboard using Tailwind utility classes.
- The segment page is accessible by both roles; saving is only enabled for `admin`.
- This is an MVP: the "Save Segment" action logs an audit event but does not persist to a database.
