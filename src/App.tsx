import { useEffect } from 'react';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServiceDeepDive from './components/ServiceDeepDive';
import BrandBuilding from './components/BrandBuilding';
import AIServicesGrid from './components/AIServicesGrid';
import WhyKoret from './components/WhyKoret';
import TargetIndustries from './components/TargetIndustries';
import HowItWorksSection from './components/HowItWorksSection';
import RecentWork from './components/RecentWork';
import Results from './components/Results';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
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
      {/* Problem → the three services, in nav order → who it's for → proof (work, then
          numbers) → process →
          why us → objections → form. The form is the last thing before the footer, so
          there is no separate closing CTA pointing back up at it. */}
      <Hero />
      <AboutSection />
      <ServiceDeepDive />
      <AIServicesGrid />
      <BrandBuilding />
      <TargetIndustries />
      <RecentWork />
      <Results />
      <HowItWorksSection />
      <WhyKoret />
      <FAQ />
      <ContactForm />
      <Footer />
    </>
  );
}
