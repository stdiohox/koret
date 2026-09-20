import Hero from './components/Hero';
import AIServicesGrid from './components/AIServicesGrid';
import ServiceDeepDive from './components/ServiceDeepDive';
import ServicesTabs from './components/ServicesTabs';
import WhyKoret from './components/WhyKoret';
import ProcessTimeline from './components/ProcessTimeline';
import Results from './components/Results';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Hero />
      <AIServicesGrid />
      <ServiceDeepDive />
      <ServicesTabs />
      <WhyKoret />
      <ProcessTimeline />
      <Results />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
