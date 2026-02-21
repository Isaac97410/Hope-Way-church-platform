import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import { Toaster } from '@/components/ui/sonner';
import '@/index.css'
import { HomePage } from '@/pages/HomePage'
import { AboutPage } from '@/pages/AboutPage'
import { MinistriesPage } from '@/pages/MinistriesPage'
import { SermonsPage } from '@/pages/SermonsPage'
import { EventsPage } from '@/pages/EventsPage'
import GivePage from '@/pages/GivePage'
import { ContactPage } from '@/pages/ContactPage'
import { AdminPage } from '@/pages/Admin/AdminPage'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/about",
    element: <AboutPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/ministries",
    element: <MinistriesPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/sermons",
    element: <SermonsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/events",
    element: <EventsPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/give",
    element: <GivePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    errorElement: <RouteErrorBoundary />,
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <RouterProvider router={router} />
        <Toaster position="top-center" />
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>,
)