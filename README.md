# MeetUsVR Login Application

A modern React login application built with Vite, implementing a beautiful UI based on Figma design and integrating with the Yeshtery API for authentication.

## Features

- ✅ Beautiful, responsive login form matching Figma design
- ✅ Email and password validation
- ✅ Zustand state management
- ✅ Protected routes with authentication guards
- ✅ Dashboard with user information
- ✅ Session persistence using localStorage
- ✅ API integration with Yeshtery backend

## Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Zustand** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Login.jsx          # Login form component
│   ├── Login.css          # Login styles
│   ├── Dashboard.jsx      # Dashboard component
│   ├── Dashboard.css      # Dashboard styles
│   └── PrivateRoute.jsx   # Route protection
├── store/
│   └── authStore.js       # Zustand auth store
├── services/
│   └── authService.js     # API service
├── App.jsx                # Main app component
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## Authentication Flow

1. User enters email and password
2. System validates email format (xxx@yyy.zzz)
3. On submit, calls `/v1/yeshtery/token` API
4. Stores token in localStorage and Zustand store
5. Retrieves user info from `/v1/user/info` API
6. Redirects to dashboard
7. Dashboard displays user ID and name

## API Endpoints

- **Login:** `POST https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token`
- **User Info:** `GET https://api-yeshtery.dev.meetusvr.com/v1/user/info`

## Test Credentials

- Email: `dev.aert@gmail.com`
- Password: `helloworld`

## Features Implemented

### Login Page
- Email input with validation
- Password input with validation
- Disabled button state when fields are invalid
- Beautiful gradient right panel with animated SVG
- Responsive design

### Dashboard
- User information display (ID, Name, Email)
- Logout functionality
- Protected route requiring authentication

### State Management
- Zustand for global state
- Token and user info persistence
- Auto-restore session on app load

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT
