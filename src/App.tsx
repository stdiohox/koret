import Nav from './components/Nav';
import Hero from './components/Hero';
import LogoStrip from './components/LogoStrip';
import ServicesTabs from './components/ServicesTabs';
import AIServicesGrid from './components/AIServicesGrid';
import WhyKoret from './components/WhyKoret';
import ProcessTimeline from './components/ProcessTimeline';
import Results from './components/Results';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <LogoStrip />
      <ServicesTabs />
      <AIServicesGrid />
      <WhyKoret />
      <ProcessTimeline />
      <Results />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
