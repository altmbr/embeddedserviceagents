'use client';

import { useState, useEffect, useCallback } from 'react';
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
import EmailModal, { useExitIntent } from '@/components/EmailModal';

const CAL_URL = 'https://cal.com/altmbr/30min';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSubmittedEmail, setHasSubmittedEmail] = useState(false);
  const [exitModalShown, setExitModalShown] = useState(false);

  // Check if user has already submitted email (in this session)
  useEffect(() => {
    const submitted = sessionStorage.getItem('email_submitted');
    if (submitted) {
      setHasSubmittedEmail(true);
    }
  }, []);

  const handleCtaClick = useCallback(() => {
    if (hasSubmittedEmail) {
      // Already have email, go directly to cal
      window.open(CAL_URL, '_blank');
    } else {
      setIsModalOpen(true);
    }
  }, [hasSubmittedEmail]);

  const handleModalSuccess = useCallback(() => {
    setHasSubmittedEmail(true);
    sessionStorage.setItem('email_submitted', 'true');
    setIsModalOpen(false);
    // Small delay then open cal
    setTimeout(() => {
      window.open(CAL_URL, '_blank');
    }, 300);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Exit intent handler
  const handleExitIntent = useCallback(() => {
    if (!hasSubmittedEmail && !isModalOpen && !exitModalShown) {
      setIsModalOpen(true);
      setExitModalShown(true);
    }
  }, [hasSubmittedEmail, isModalOpen, exitModalShown]);

  useExitIntent(handleExitIntent);

  return (
    <main className="min-h-screen">
      <Header onCtaClick={handleCtaClick} />
      <Hero onCtaClick={handleCtaClick} />
      <TradesServed />
      <TrustBar />
      <Problem />
      <Solution />
      <Testimonials />
      <HowItWorks />
      <Pricing onCtaClick={handleCtaClick} />
      <FAQ />
      <FinalCTA onCtaClick={handleCtaClick} />
      <Footer />

      {/* Mobile sticky footer CTA */}
      <MobileFooterCTA onCtaClick={handleCtaClick} />

      <EmailModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        source="cta-modal"
      />
    </main>
  );
}
