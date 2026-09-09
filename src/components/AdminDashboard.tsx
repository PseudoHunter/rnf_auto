import React, { useState } from 'react';
import { 
  Shield, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  FileText, 
  Layers, 
  DollarSign, 
  Users, 
  HelpCircle,
  Eye,
  LogOut,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { RnfLogo } from './RnfLogo';

export const AdminDashboard: React.FC = () => {
  const {
    content,
    updateCompanyInfo,
    updateHero,
    updatePainPoints,
    updateServices,
    updateHowItWorks,
    updateCostComparison,
    updatePricingTiers,
    updateTestimonials,
    resetToDefaults,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    navigateTo,
  } = useCms();

  const [activeTab, setActiveTab] = useState<'company' | 'hero' | 'painPoints' | 'services' | 'howItWorks' | 'cost' | 'pricing' | 'testimonials'>('company');
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  // Local state for current active form tab to allow editing and batch saving
  const [companyForm, setCompanyForm] = useState(content.companyInfo);
  const [heroForm, setHeroForm] = useState(content.hero);
  const [painPointsForm, setPainPointsForm] = useState(content.painPoints);
  const [servicesForm, setServicesForm] = useState(content.services);
  const [howItWorksForm, setHowItWorksForm] = useState(content.howItWorks);
  const [costForm, setCostForm] = useState(content.costComparison);
  const [pricingForm, setPricingForm] = useState(content.pricingTiers);
  const [testimonialsForm, setTestimonialsForm] = useState(content.testimonials);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const success = loginAdmin(pinInput);
    if (!success) {
      setPinError(true);
    } else {
      setPinError(false);
      setPinInput('');
    }
  };

  const showToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleSaveCompany = () => {
    updateCompanyInfo(companyForm);
    showToast();
  };

  const handleSaveHero = () => {
    updateHero(heroForm);
    showToast();
  };

  const handleSavePainPoints = () => {
    updatePainPoints(painPointsForm);
    showToast();
  };

  const handleSaveServices = () => {
    updateServices(servicesForm);
    showToast();
  };

  const handleSaveHowItWorks = () => {
    updateHowItWorks(howItWorksForm);
    showToast();
  };

  const handleSaveCost = () => {
    updateCostComparison(costForm);
    showToast();
  };

  const handleSavePricing = () => {
    updatePricingTiers(pricingForm);
    showToast();
  };

  const handleSaveTestimonials = () => {
    updateTestimonials(testimonialsForm);
    showToast();
  };

  const handleResetAll = () => {
    if (window.confirm('Adakah anda pasti untuk mengembalikan semua teks kepada asal?')) {
      resetToDefaults();
      // Reload current local forms
      setCompanyForm(content.companyInfo);
      setHeroForm(content.hero);
      setPainPointsForm(content.painPoints);
      setServicesForm(content.services);
      setHowItWorksForm(content.howItWorks);
      setCostForm(content.costComparison);
      setPricingForm(content.pricingTiers);
      setTestimonialsForm(content.testimonials);
      showToast();
    }
  };

  // If not logged in, show access gate
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <RnfLogo size={64} variant="badge" />
            </div>
            <h1 className="font-['Outfit'] text-2xl font-bold text-slate-900">
              RNF Admin Portal
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sila masukkan PIN Pentadbir untuk mengedit kandungan laman web.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                PIN Keselamatan
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Masukkan PIN (cth. rnf2026)"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono tracking-widest text-center"
                  autoFocus
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
              </div>
              {pinError && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3.5 h-3.5" /> PIN tidak tepat. Gunakan: <span className="font-mono font-bold">rnf2026</span>
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4" />
              <span>Buka Panel Pentadbir</span>
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  loginAdmin('rnf2026');
                }}
                className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
              >
                Atau Log Masuk 1-Klik Pantas (Demo / Owner)
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-center">
              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Laman Utama
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Admin Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <RnfLogo size={36} variant="badge" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Outfit'] font-bold text-base text-white">
                  RNF Business Solutions
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
                  Admin CMS
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Penyunting Kandungan Langsung (/admin)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigateTo('home')}
              className="px-3 sm:px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Lihat Laman Web Langsung"
            >
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Pratonton Laman Web</span>
            </button>

            <button
              onClick={handleResetAll}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Reset ke Nilai Asal"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={logoutAdmin}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              title="Log Keluar Pentadbir"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Save Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm font-bold animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>Perubahan berjaya disimpan ke laman web!</span>
        </div>
      )}

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl p-1.5 shadow-sm border border-slate-200 mb-8 overflow-x-auto flex gap-1">
          <button
            onClick={() => setActiveTab('company')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'company'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>1. Profil & Hubungi</span>
          </button>

          <button
            onClick={() => setActiveTab('hero')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'hero'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>2. Hero & Headline</span>
          </button>

          <button
            onClick={() => setActiveTab('painPoints')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'painPoints'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>3. Masalah SME</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'services'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>4. Servis & Khidmat</span>
          </button>

          <button
            onClick={() => setActiveTab('howItWorks')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'howItWorks'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>5. Cara Kerja</span>
          </button>

          <button
            onClick={() => setActiveTab('cost')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'cost'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>6. Banding Kos</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'pricing'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>7. Pakej Harga</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'testimonials'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>8. Testimoni</span>
          </button>
        </div>

        {/* Tab 1: Company Profile & Contact */}
        {activeTab === 'company' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h2 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  Maklumat Rasmi Syarikat & Hubungan
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Maklumat ini akan dipaparkan di Header, Footer, Borang Konsultasi dan butang WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveCompany}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Maklumat</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Perniagaan / Syarikat *
                </label>
                <input
                  type="text"
                  value={companyForm.name}
                  onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  No. Pendaftaran SSM
                </label>
                <input
                  type="text"
                  value={companyForm.regNumber}
                  onChange={(e) => setCompanyForm({ ...companyForm, regNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alamat Pejabat Rasmi *
                </label>
                <textarea
                  rows={2}
                  value={companyForm.address}
                  onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nombor Telefon (Paparan) *
                </label>
                <input
                  type="text"
                  value={companyForm.phoneDisplay}
                  onChange={(e) => setCompanyForm({ ...companyForm, phoneDisplay: e.target.value, phone: e.target.value })}
                  placeholder="011-51291786"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Emel Rasmi / Am *
                </label>
                <input
                  type="email"
                  value={companyForm.email}
                  onChange={(e) => setCompanyForm({ ...companyForm, email: e.target.value })}
                  placeholder="info@rnfbusinesssolutions.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  No. WhatsApp (Format Antarabangsa tanpa + cth: 601151291786) *
                </label>
                <input
                  type="text"
                  value={companyForm.whatsappNumber}
                  onChange={(e) => setCompanyForm({ ...companyForm, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Waktu Operasi
                </label>
                <input
                  type="text"
                  value={companyForm.operatingHours}
                  onChange={(e) => setCompanyForm({ ...companyForm, operatingHours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Hero Section */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h2 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  Hero Section & Tajuk Utama
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Ubah mesej penarik perhatian di bahagian paling atas laman web.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveHero}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Hero</span>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Eyebrow Badge (Label Kecil Atas)
                </label>
                <input
                  type="text"
                  value={heroForm.eyebrow}
                  onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tajuk Utama (Baris 1)
                  </label>
                  <input
                    type="text"
                    value={heroForm.headline}
                    onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sorotan Tajuk (Warna Gradien / Emas)
                  </label>
                  <input
                    type="text"
                    value={heroForm.headlineHighlight}
                    onChange={(e) => setHeroForm({ ...heroForm, headlineHighlight: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none text-amber-600 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Sub-tajuk Penerangan
                </label>
                <textarea
                  rows={3}
                  value={heroForm.subheadline}
                  onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Harga Bermula (Highlight)
                </label>
                <input
                  type="text"
                  value={heroForm.startingPrice}
                  onChange={(e) => setHeroForm({ ...heroForm, startingPrice: e.target.value })}
                  className="w-full sm:w-1/2 px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: SME Pain Points */}
        {activeTab === 'painPoints' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h2 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  4 Masalah Utama Pemilik SME
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Poin masalah harian yang dialami peniaga (&lt; RM500k) untuk meningkatkan kadar penukaran (conversion).
                </p>
              </div>
              <button
                type="button"
                onClick={handleSavePainPoints}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Masalah SME</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {painPointsForm.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg">
                      Masalah #{idx + 1}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      Ikon: {item.icon}
                    </span>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Tajuk Masalah</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...painPointsForm];
                        updated[idx].title = e.target.value;
                        setPainPointsForm(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Penerangan Ringkas</label>
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => {
                        const updated = [...painPointsForm];
                        updated[idx].desc = e.target.value;
                        setPainPointsForm(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Highlight Badge</label>
                    <input
                      type="text"
                      value={item.highlight}
                      onChange={(e) => {
                        const updated = [...painPointsForm];
                        updated[idx].highlight = e.target.value;
                        setPainPointsForm(updated);
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none text-emerald-700 font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Services */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h2 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  4 Perkhidmatan Utama Syarikat
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Ubah butiran servis: Simpan Kira, Cukai LHDN, Gaji & KWSP/SOCSO, Penyata Bank.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveServices}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Servis</span>
              </button>
            </div>

            <div className="space-y-6">
              {servicesForm.map((service, idx) => (
                <div key={service.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-blue-800 bg-blue-100 px-3 py-1 rounded-full">
                      Servis {idx + 1}: {service.id}
                    </span>
                    <input
                      type="text"
                      value={service.badge}
                      onChange={(e) => {
                        const updated = [...servicesForm];
                        updated[idx].badge = e.target.value;
                        setServicesForm(updated);
                      }}
                      className="px-3 py-1 text-xs rounded-lg border border-slate-300 font-bold text-blue-700"
                      placeholder="Badge (cth. Paling Popular)"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tajuk Servis</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const updated = [...servicesForm];
                          updated[idx].title = e.target.value;
                          setServicesForm(updated);
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={service.tagline}
                        onChange={(e) => {
                          const updated = [...servicesForm];
                          updated[idx].tagline = e.target.value;
                          setServicesForm(updated);
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Penerangan Servis</label>
                    <textarea
                      rows={2}
                      value={service.desc}
                      onChange={(e) => {
                        const updated = [...servicesForm];
                        updated[idx].desc = e.target.value;
                        setServicesForm(updated);
                      }}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: How It Works */}
        {activeTab === 'howItWorks' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h2 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  Cara Kerja 3 Langkah Mudah
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Langkah praktikal peniaga menghantar dokumen melalui WhatsApp dan menerima laporan bulanan.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveHowItWorks}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Cara Kerja</span>
              </button>
            </div>

            <div className="space-y-6">
              {howItWorksForm.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="font-bold text-xs text-amber-700">Langkah {idx + 1}</div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tajuk Langkah</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => {
                        const updated = [...howItWorksForm];
                        updated[idx].title = e.target.value;
                        setHowItWorksForm(updated);
                      }}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Penerangan Langkah</label>
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={(e) => {
                        const updated = [...howItWorksForm];
                        updated[idx].desc = e.target.value;
                        setHowItWorksForm(updated);
                      }}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Cost Comparison */}
        {activeTab === 'cost' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h2 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  Kiraan Perbandingan Kos (Kerani vs RNF)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Kalkulator penjimatan automatik yang membuktikan penjimatan tunai sehingga 70% setahun.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveCost}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Kiraan Kos</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* In-House Clerk Expenses */}
              <div className="p-6 rounded-2xl border border-red-200 bg-red-50/30 space-y-4">
                <h3 className="font-bold text-sm text-red-800 uppercase tracking-wider">
                  Kos Menggaji Kerani Akaun In-House (RM / bln)
                </h3>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gaji Pokok Kerani</label>
                  <input
                    type="number"
                    value={costForm.inHouse.monthlySalary}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const total = val + costForm.inHouse.epfSocsoEis + costForm.inHouse.softwareLicenses + costForm.inHouse.officeEquipmentHr;
                      setCostForm({
                        ...costForm,
                        inHouse: { ...costForm.inHouse, monthlySalary: val, totalMonthly: total, annualCost: total * 12 }
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">KWSP & SOCSO Majikan</label>
                  <input
                    type="number"
                    value={costForm.inHouse.epfSocsoEis}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const total = costForm.inHouse.monthlySalary + val + costForm.inHouse.softwareLicenses + costForm.inHouse.officeEquipmentHr;
                      setCostForm({
                        ...costForm,
                        inHouse: { ...costForm.inHouse, epfSocsoEis: val, totalMonthly: total, annualCost: total * 12 }
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lesen Perisian & Alat Tulis</label>
                  <input
                    type="number"
                    value={costForm.inHouse.softwareLicenses}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      const total = costForm.inHouse.monthlySalary + costForm.inHouse.epfSocsoEis + val + costForm.inHouse.officeEquipmentHr;
                      setCostForm({
                        ...costForm,
                        inHouse: { ...costForm.inHouse, softwareLicenses: val, totalMonthly: total, annualCost: total * 12 }
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
                <div className="pt-2 border-t border-red-200">
                  <div className="text-xs text-slate-600">Jumlah Kos Bulanan In-House:</div>
                  <div className="font-['Outfit'] text-2xl font-extrabold text-red-600">
                    RM {costForm.inHouse.totalMonthly.toLocaleString()} / bulan
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    (RM {costForm.inHouse.annualCost.toLocaleString()} setahun)
                  </div>
                </div>
              </div>

              {/* RNF Outsource Package */}
              <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/30 space-y-4">
                <h3 className="font-bold text-sm text-emerald-800 uppercase tracking-wider">
                  Yuran Pakej Outsource RNF Solutions
                </h3>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Yuran Purata Pakej (RM / bln)</label>
                  <input
                    type="number"
                    value={costForm.rnfManaged.totalMonthly}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCostForm({
                        ...costForm,
                        rnfManaged: { ...costForm.rnfManaged, totalMonthly: val, annualCost: val * 12 }
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-bold text-emerald-700"
                  />
                </div>
                <div className="pt-8 border-t border-emerald-200">
                  <div className="text-xs text-slate-600">Penjimatan Tunai Bersih Setahun:</div>
                  <div className="font-['Outfit'] text-3xl font-extrabold text-emerald-600">
                    RM {(costForm.inHouse.annualCost - costForm.rnfManaged.annualCost).toLocaleString()}
                  </div>
                  <div className="text-xs text-emerald-700 font-semibold mt-1">
                    Jimat lebih 70% daripada perbelanjaan staf tetap!
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Pricing Tiers */}
        {activeTab === 'pricing' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h2 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  Pakej Langganan Bulanan & Tahunan
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Ubah harga pakej Mikro (RM299), SME Berkembang (RM499), dan Sdn Bhd Pro (RM799).
                </p>
              </div>
              <button
                type="button"
                onClick={handleSavePricing}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pakej Harga</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {pricingForm.map((tier, idx) => (
                <div key={tier.id} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{tier.name}</span>
                    {tier.isPopular && (
                      <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Harga Bulanan (RM)</label>
                      <input
                        type="number"
                        value={tier.monthlyPrice}
                        onChange={(e) => {
                          const updated = [...pricingForm];
                          updated[idx].monthlyPrice = Number(e.target.value);
                          setPricingForm(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-blue-700"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Pelan Tahunan (RM)</label>
                      <input
                        type="number"
                        value={tier.annualPriceMonthly}
                        onChange={(e) => {
                          const updated = [...pricingForm];
                          updated[idx].annualPriceMonthly = Number(e.target.value);
                          setPricingForm(updated);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-emerald-700"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Profil Bisnes Sasaran</label>
                    <input
                      type="text"
                      value={tier.targetProfile}
                      onChange={(e) => {
                        const updated = [...pricingForm];
                        updated[idx].targetProfile = e.target.value;
                        setPricingForm(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Had Bilangan Transaksi</label>
                    <input
                      type="text"
                      value={tier.transactionLimit}
                      onChange={(e) => {
                        const updated = [...pricingForm];
                        updated[idx].transactionLimit = e.target.value;
                        setPricingForm(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 8: Testimonials */}
        {activeTab === 'testimonials' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
              <div>
                <h2 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  Testimoni Pelanggan SME
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Kisah kejayaan peniaga tempatan yang telah jimat kos dan lulus pinjaman dengan RNF.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveTestimonials}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Testimoni</span>
              </button>
            </div>

            <div className="space-y-6">
              {testimonialsForm.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="text-xs font-bold text-blue-700">Testimoni #{idx + 1}</div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Petikan Review Pelanggan</label>
                    <textarea
                      rows={2}
                      value={item.quote}
                      onChange={(e) => {
                        const updated = [...testimonialsForm];
                        updated[idx].quote = e.target.value;
                        setTestimonialsForm(updated);
                      }}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm leading-relaxed"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nama Pemilik</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const updated = [...testimonialsForm];
                          updated[idx].name = e.target.value;
                          setTestimonialsForm(updated);
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Perniagaan / Bisnes</label>
                      <input
                        type="text"
                        value={item.business}
                        onChange={(e) => {
                          const updated = [...testimonialsForm];
                          updated[idx].business = e.target.value;
                          setTestimonialsForm(updated);
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Hasil / Metrik Jimat</label>
                      <input
                        type="text"
                        value={item.savings}
                        onChange={(e) => {
                          const updated = [...testimonialsForm];
                          updated[idx].savings = e.target.value;
                          setTestimonialsForm(updated);
                        }}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm text-emerald-600 font-bold"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
