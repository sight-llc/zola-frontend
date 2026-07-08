# Zola Frontend

**Modern React frontend for Zola — Banking built for you.**

A beautiful, responsive consumer wallet interface built with React 19, TypeScript, TanStack Router, and Tailwind CSS. Connects to the Zola backend to provide users with dedicated NUBAN accounts, instant transfers, and transaction management.

🔗 **Live:** [zola-frontend.vercel.app](https://zola-frontend.vercel.app/)

---

## Features

- **Authentication** — Secure login/register with JWT tokens
- **Dashboard** — Real-time balance and account overview
- **Virtual Account** — View dedicated NUBAN details
- **Send Money** — Instant transfers to any Nigerian bank
- **Transaction History** — Complete wallet statement
- **KYC Management** — BVN verification and ID upload
- **Settings** — Profile and security management
- **Dark Mode** — System-aware theme switching

---

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **TypeScript** | Type safety |
| **TanStack Router** | File-based routing |
| **TanStack Query** | Server state management |
| **Tailwind CSS 4** | Styling |
| **shadcn/ui** | Component library |
| **Vite** | Build tool |
| **React Hook Form + Zod** | Form validation |

---

## Project Structure

```
zola-frontend/
├── src/
│   ├── routes/                 # TanStack Router pages
│   │   ├── __root.tsx         # Root layout with providers
│   │   ├── auth.tsx           # Login/register
│   │   ├── _app.home.tsx      # Dashboard
│   │   ├── _app.send.tsx      # Send money
│   │   ├── _app.settings.tsx  # User settings
│   │   └── ...
│   │
│   ├── lib/                   # Utilities and API
│   │   ├── api.ts            # API client (all endpoints)
│   │   ├── auth.ts           # Authentication context
│   │   ├── toast.ts          # Toast notifications
│   │   └── ...
│   │
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   └── ...
│   │
│   ├── hooks/                 # Custom React hooks
│   ├── styles.css            # Global styles
│   └── router.tsx            # Router configuration
│
├── public/                    # Static assets
├── package.json
├── vite.config.ts
├── tsconfig.json
└── .env.example
```

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or bun
- Zola Backend running on `http://localhost:8000`

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# The .env file should contain:
# VITE_API_URL=http://localhost:8000
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Lint & Format

```bash
# Run ESLint
npm run lint

# Format with Prettier
npm run format
```

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Zola Backend API URL | `http://localhost:8000` |

---

## API Integration

The frontend communicates with the Zola Backend through a centralized API client (`src/lib/api.ts`).

### Key API Functions

```typescript
// Authentication
login(email, password)
register(name, email, password, phone?)
setPin(pin)
signOut()

// Wallet
getBalance()
getVirtualAccount()

// Transactions
getTransactions()
getTransaction(id)

// Transfers
getBanks()
resolveAccount(bankCode, accountNumber)
sendMoney(bankCode, accountNumber, accountName, amount, narration, pin)

// KYC
getKycStatus()
submitBvn(bvn)
submitId(file)
```

### Authentication Flow

1. User logs in with email/password
2. Backend returns JWT token
3. Token stored in `localStorage` as `zola.token`
4. All subsequent requests include `Authorization: Bearer <token>`
5. User data cached in `localStorage` as `zola.user`

---

## Routing

The app uses TanStack Router with file-based routing:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `_app.home.tsx` | Dashboard with balance & transactions |
| `/auth` | `auth.tsx` | Login/register page |
| `/send` | `_app.send.tsx` | Send money page |
| `/settings` | `_app.settings.tsx` | User settings & KYC |
| `/*` | NotFound | 404 page |

---

## State Management

- **Server State:** TanStack Query (React Query) for API data
- **Client State:** React Context for auth and toast notifications
- **Session:** localStorage for JWT persistence

---

## UI Components

Built with [shadcn/ui](https://ui.shadcn.com/) — a collection of re-usable components built on Radix UI and Tailwind CSS.

Key components used:
- Button, Input, Label
- Dialog, Sheet, Drawer
- Dropdown Menu, Popover
- Toast notifications
- Tabs, Accordion
- Form components with React Hook Form

---

## Styling

- **Framework:** Tailwind CSS 4
- **Theme:** Dark/light mode with system preference detection
- **Design:** Clean, modern interface inspired by modern banking apps
- **Responsive:** Mobile-first design

---

## Development Tips

### Adding a New Page

1. Create a new file in `src/routes/` (e.g., `_app.transactions.tsx`)
2. Export a `Route` component using `createFileRoute`
3. The route will be automatically available at `/transactions`

### Adding a New API Endpoint

1. Add the function in `src/lib/api.ts`
2. Use the helper functions `GET`, `POST`, etc.
3. Type the response with TypeScript interfaces

### Adding UI Components

```bash
# Add a shadcn/ui component
npx shadcn@latest add [component-name]
```

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Related Projects

- **[Zola Backend](../zola-backend/README.md)** — FastAPI backend service
- **[Meroe](../../nombadva/README.md)** — Banking infrastructure (formerly NombaVault)

---

## License

MIT

---

## Team

Part of the Zola project — demonstrating rapid financial application development with Meroe.