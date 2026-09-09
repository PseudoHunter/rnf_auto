import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SmePainPoints } from './components/SmePainPoints';
import { SmeServices } from './components/SmeServices';
import { SmeHowItWorks } from './components/SmeHowItWorks';
import { SmeCostComparison } from './components/SmeCostComparison';
import { SmeTestimonials } from './components/SmeTestimonials';
import { PricingSection } from './components/PricingSection';
import { ConsultationFormSection } from './components/ConsultationFormSection';
import { Footer } from './components/Footer';
import { StickyWhatsApp } from './components/StickyWhatsApp';
import { HealthCheckModal } from './components/HealthCheckModal';
import { AdminDashboard } from './components/AdminDashboard';

function MainSiteContent() {
  const { currentRoute, navigateTo } = useCms();
  const [isHealthCheckOpen, setIsHealthCheckOpen] = useState(false);
  const [selectedPackageForModal, setSelectedPackageForModal] = useState<string | undefined>(undefined);

  // Secret shortcut: Ctrl+Shift+A or Cmd+Shift+A or Alt+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        navigateTo('admin');
      } else if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        navigateTo('admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateTo]);

  if (currentRoute === 'admin') {
    return <AdminDashboard />;
  }

  const handleOpenHealthCheck = (packageOrTopic?: string) => {
    setSelectedPackageForModal(packageOrTopic);
    setIsHealthCheckOpen(true);
  };

  const handleCloseHealthCheck = () => {
    setIsHealthCheckOpen(false);
  };

  const handleNavigateTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTier = (tierName: string) => {
    const formEl = document.getElementById('consultation-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleOpenHealthCheck(`Berminat dengan pakej ${tierName}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar
        onOpenHealthCheck={() => handleOpenHealthCheck()}
        onNavigateTo={handleNavigateTo}
      />

      <main className="flex-grow">
        {/* 2. Hero Section (with Direct SME Focus & 1-Minute Diagnostic Saringan) */}
        <HeroSection
          onOpenHealthCheck={() => handleOpenHealthCheck()}
          onNavigateToSavings={() => handleNavigateTo('bandingkan-kos')}
        />

        {/* 3. Masalah Utama Pemilik SME (< RM500k Revenue) */}
        <SmePainPoints
          onOpenHealthCheck={() => handleOpenHealthCheck('Penyelesaian Masalah Akaun SME')}
        />

        {/* 4. Servis Jelas & Direct (Simpan Kira, Cukai, Gaji, Penyata Bank) */}
        <SmeServices
          onSelectService={(service) => handleOpenHealthCheck(`Pertanyaan Servis: ${service}`)}
        />

        {/* 5. Cara Kerja 3 Langkah Mudah (Hantar Gambar via WhatsApp) */}
        <SmeHowItWorks />

        {/* 6. Perbandingan Kos Nyata: Gaji Kerani vs Outsource RNF */}
        <SmeCostComparison
          onOpenHealthCheck={() => handleOpenHealthCheck('Pelan Jimat Kos SME')}
        />

        {/* 7. Pakej Harga Telus & Berpatutan */}
        <PricingSection
          onSelectTier={handleSelectTier}
          onOpenHealthCheck={() => handleOpenHealthCheck('Pakej Harga')}
        />

        {/* 8. Testimoni Peniaga & Pemilik SME Sebenar */}
        <SmeTestimonials />

        {/* 9. Borang Tempahan & Sebut Harga Pantas */}
        <ConsultationFormSection
          preselectedPackage={selectedPackageForModal}
        />
      </main>

      {/* 10. Corporate Footer */}
      <Footer
        onNavigateTo={handleNavigateTo}
        onOpenHealthCheck={() => handleOpenHealthCheck()}
      />

      {/* 11. Sticky WhatsApp Consultation Widget */}
      <StickyWhatsApp />

      {/* 12. Modal Dialogue for Free 30-Min Financial Health Check */}
      <HealthCheckModal
        isOpen={isHealthCheckOpen}
        onClose={handleCloseHealthCheck}
        preselectedTopic={selectedPackageForModal}
      />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <MainSiteContent />
    </CmsProvider>
  );
}
