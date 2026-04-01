import {
  Outlet,
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
} from '@tanstack/react-router'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import TeachersPage from './pages/TeachersPage'
import { motion } from 'framer-motion'

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--color-background)' }}>
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-[10%] -right-[5%] w-[60vw] h-[60vw] max-w-[1000px] max-h-[1000px]"
          style={{
            background: 'radial-gradient(circle at center, rgba(16, 110, 251, 0.05) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 120, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-[20%] -left-[10%] w-[70vw] h-[70vw] max-w-[1200px] max-h-[1200px]"
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

// Create the Teachers route
const teachersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teachers',
  component: TeachersPage,
})

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, teachersRoute])

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
