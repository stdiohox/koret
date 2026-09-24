import { useEffect } from 'react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServiceDeepDive from './components/ServiceDeepDive';
import BrandBuilding from './components/BrandBuilding';
import AIServicesGrid from './components/AIServicesGrid';
import WhyKoret from './components/WhyKoret';
import TargetIndustries from './components/TargetIndustries';
import HowItWorksSection from './components/HowItWorksSection';
import Results from './components/Results';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  // The browser resolves a fragment before React has rendered the target, so a
  // direct hit on /#industries finds nothing and stays at the top. Re-run the
  // scroll once the sections exist. 'auto' rather than 'smooth': this is a
  // correction to where the page should have landed, not a navigation.
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'auto' });
      }
    }
  }, []);

  return (
    <>
      <Hero />
      <AboutSection />
      <ServiceDeepDive />
      <BrandBuilding />
      <AIServicesGrid />
      <WhyKoret />
      <TargetIndustries />
      <HowItWorksSection />
      <Results />
      <FAQ />
      <ContactForm />
      <FinalCTA />
      <Footer />
    </>
  );
}
