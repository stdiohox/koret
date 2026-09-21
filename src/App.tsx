import Hero from './components/Hero';
import ServiceDeepDive from './components/ServiceDeepDive';
import BrandBuilding from './components/BrandBuilding';
import AIServicesGrid from './components/AIServicesGrid';
import WhyKoret from './components/WhyKoret';
import HowItWorksSection from './components/HowItWorksSection';
import Results from './components/Results';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Hero />
      <ServiceDeepDive />
      <BrandBuilding />
      <AIServicesGrid />
      <WhyKoret />
      <HowItWorksSection />
      <Results />
      <FAQ />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  );
}
