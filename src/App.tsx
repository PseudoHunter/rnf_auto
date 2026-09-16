import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { Navbar } from './components/Navbar';
import { HomeSectionLayout } from './components/HomeSectionLayout';
import { FleetSectionLayout } from './components/FleetSectionLayout';
import { AboutSectionLayout } from './components/AboutSectionLayout';
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
      handleOpenHealthCheck(`Inquiry for ${tierName}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#00253c] text-[#f4f6fc] flex flex-col selection:bg-[#003352] selection:text-white">
      {/* 1. Global Navigation */}
      <Navbar
        onOpenHealthCheck={() => handleOpenHealthCheck()}
        onNavigateTo={handleNavigateTo}
      />

      <main className="flex-grow">
        {/* Section 1: HOME (Matching Home.svg & Home (2).svg) */}
        <HomeSectionLayout
          onOpenHealthCheck={handleOpenHealthCheck}
          onNavigateTo={handleNavigateTo}
        />

        {/* Section 2: OUR PACKAGES & SERVICES (Matching Our fleet.svg) */}
        <FleetSectionLayout
          onSelectTier={handleSelectTier}
          onOpenHealthCheck={handleOpenHealthCheck}
        />

        {/* Section 3: ABOUT US (Matching About us.svg) */}
        <AboutSectionLayout
          onOpenHealthCheck={handleOpenHealthCheck}
        />
      </main>

      {/* Corporate Footer */}
      <Footer
        onNavigateTo={handleNavigateTo}
        onOpenHealthCheck={() => handleOpenHealthCheck()}
      />

      {/* Sticky WhatsApp Consultation Widget */}
      <StickyWhatsApp />

      {/* Modal Dialogue for Free 30-Min Financial Health Check */}
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
