import { lazy, Suspense } from 'react'
import Hero from '../components/Hero'

// Lazy-load all below-the-fold sections — they're not visible on first paint
const About       = lazy(() => import('../components/About'))
const Roadmap     = lazy(() => import('../components/Roadmap'))
const Features    = lazy(() => import('../components/Features'))
const Teachers    = lazy(() => import('../components/Teachers'))
const Pricing     = lazy(() => import('../components/Pricing'))
const Testimonials = lazy(() => import('../components/Testimonials'))
const Certificates = lazy(() => import('../components/Certificates'))
const Partners    = lazy(() => import('../components/Partners'))
const FAQ         = lazy(() => import('../components/FAQ'))
const Contact     = lazy(() => import('../components/Contact'))

// Thin inline loading placeholder — keeps layout stable while chunks load
function SectionFallback() {
  return <div className="w-full py-24" aria-hidden="true" />
}

export default function Home() {
  return (
    <>
      {/* Hero is eagerly loaded — it's the first thing users see */}
      <Hero />

      {/* All below-the-fold sections stream in as their JS chunks arrive */}
      <Suspense fallback={<SectionFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Roadmap />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Teachers limit={4} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Certificates />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact />
      </Suspense>
    </>
  )
}
