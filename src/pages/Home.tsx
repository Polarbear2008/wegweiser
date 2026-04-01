import Hero from '../components/Hero'
import About from '../components/About'
import Roadmap from '../components/Roadmap'
import Features from '../components/Features'
import Teachers from '../components/Teachers'
import Pricing from '../components/Pricing'
import Testimonials from '../components/Testimonials'
import Certificates from '../components/Certificates'
import SocialProof from '../components/SocialProof'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Roadmap />
      <Features />
      <Teachers limit={4} />
      <Pricing />
      <Testimonials />
      <Certificates />
      <SocialProof />
      <FAQ />
      <Contact />
    </>
  )
}
