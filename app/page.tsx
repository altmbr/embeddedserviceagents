import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TradesServed from '@/components/TradesServed';
import TrustBar from '@/components/TrustBar';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import Testimonials from '@/components/Testimonials';
import HowItWorks from '@/components/HowItWorks';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import MobileFooterCTA from '@/components/MobileFooterCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <TradesServed />
      <TrustBar />
      <Problem />
      <Solution />
      <Testimonials />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />

      {/* Mobile sticky footer CTA */}
      <MobileFooterCTA />
    </main>
  );
}
