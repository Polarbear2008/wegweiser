import {
  Outlet,
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

// Lazy load non-critical pages — they won't be in the initial bundle
const TeachersPage = lazy(() => import('./pages/TeachersPage'))
const PlacementTest = lazy(() => import('./pages/PlacementTest'))

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--color-background)' }}>
      {/* Static ambient background — no JS animation, uses CSS only (much cheaper) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-[10%] -right-[5%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(16, 110, 251, 0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute -bottom-[20%] -left-[10%] w-[70vw] h-[70vw] max-w-[1100px] max-h-[1100px] rounded-full"
          style={{
            background: 'radial-gradient(circle at center, rgba(16, 110, 251, 0.03) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ),
})

// Create the Home route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
})

// Create the Teachers route — lazy loaded with Suspense
const teachersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teachers',
  component: () => (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#106EFB] border-t-transparent animate-spin" />
      </div>
    }>
      <TeachersPage />
    </Suspense>
  ),
})

// Create the Placement Test route
const placementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/placement-test',
  component: () => (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#106EFB] border-t-transparent animate-spin" />
      </div>
    }>
      <PlacementTest />
    </Suspense>
  ),
})

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, teachersRoute, placementRoute])

// Create the router
const router = createRouter({ routeTree })

// Register the router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function App() {
  return <RouterProvider router={router} />
}
