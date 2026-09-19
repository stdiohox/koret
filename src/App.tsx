import { LazyMotion, domAnimation } from 'framer-motion'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { TwoTracks } from './components/TwoTracks'
import { AIServices } from './components/AIServices'
import { WhyKoret } from './components/WhyKoret'
import { HowWeWork } from './components/HowWeWork'
import { Results } from './components/Results'
import { FAQ } from './components/FAQ'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

export default function App() {
  return (
    // `strict` forbids the heavyweight `motion.*` components, so the whole page
    // has to go through `m` + this one feature bundle. Keeps ~60KB of animation
    // code the page never uses out of the entry chunk.
    <LazyMotion features={domAnimation} strict>
      <Nav />
      <main id="main">
        <Hero />
        <TrustStrip />
        <TwoTracks />
        <AIServices />
        <WhyKoret />
        <HowWeWork />
        <Results />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </LazyMotion>
  )
}
