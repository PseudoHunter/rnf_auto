import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Unlock, 
  LogOut, 
  ExternalLink, 
  FileSpreadsheet, 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Layers, 
  Settings, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Plus, 
  Save, 
  RotateCcw,
  Kanban,
  List,
  Building2,
  Mail,
  Phone
} from 'lucide-react';
import { useCms, AUTHORIZED_ADMIN_EMAIL, ADMIN_PIN } from '../context/CmsContext';
import { RnfLogo } from './RnfLogo';
import { CrmKanbanView } from './admin/CrmKanbanView';
import { CrmListView } from './admin/CrmListView';
import { GoogleSheetsSyncHub } from './admin/GoogleSheetsSyncHub';
import { TestimonialsManager } from './admin/TestimonialsManager';
import { ReportingAnalytics } from './admin/ReportingAnalytics';
import { PackageEditor } from './admin/PackageEditor';
import { InquiryStatus } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    isAdminLoggedIn,
    currentAdminEmail,
    loginAdminWithEmail,
    logoutAdmin,
    navigateTo,
    leads,
    updateLeadStatus,
    assignLead,
    addLeadNote,
    deleteLead,
    addLead,
    teamMembers,
    content,
    updateCompanyInfo,
    updateHero,
    resetToDefaults
  } = useCms();

  // Login form state
  const [emailInput, setEmailInput] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  // Active Admin View Tab
  const [activeAdminTab, setActiveAdminTab] = useState<
    'crm' | 'gsheets' | 'testimonials' | 'reporting' | 'packages' | 'cms'
  >('crm');

  // CRM View Mode: Kanban vs List
  const [crmViewMode, setCrmViewMode] = useState<'kanban' | 'list'>('kanban');

  // New Lead Modal State
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [newClientName, setNewClientName] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newEntity, setNewEntity] = useState<'Sdn Bhd' | 'Enterprise' | 'LLP' | 'Perkongsian'>('Sdn Bhd');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState<'accounting' | 'payroll' | 'combo'>('accounting');
  const [newSelectedPackage, setNewSelectedPackage] = useState('STARTER (RM 600)');
  const [newDataVolume, setNewDataVolume] = useState('1 to 300 Data');
  const [newEstValue, setNewEstValue] = useState(600);

  // General CMS form states
  const [companyForm, setCompanyForm] = useState(content.companyInfo);
  const [heroForm, setHeroForm] = useState(content.hero);
  const [cmsSavedToast, setCmsSavedToast] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    const result = loginAdminWithEmail(emailInput, pinInput);
    if (!result.success) {
      setAuthError(result.error || 'Akses ditolak.');
    }
  };

  const handleQuickLoginAsAuthorized = () => {
    setEmailInput(AUTHORIZED_ADMIN_EMAIL);
    setPinInput(ADMIN_PIN);
    const result = loginAdminWithEmail(AUTHORIZED_ADMIN_EMAIL, ADMIN_PIN);
    if (!result.success) {
      setAuthError(result.error || 'Akses ditolak.');
    }
  };

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || !newCompanyName || !newPhone) {
      alert('Sila lengkapkan nama pelanggan, syarikat dan nombor telefon.');
      return;
    }

    addLead({
      fullName: newClientName,
      companyName: newCompanyName,
      entityType: newEntity,
      phone: newPhone,
      email: newEmail || 'info@client.com.my',
      serviceCategory: newServiceCategory,
      selectedPackage: newSelectedPackage,
      dataVolumeOrStaffCount: newDataVolume,
      estimatedMonthlyValue: newEstValue,
      status: 'baru',
      assignedTo: teamMembers[0]?.name || 'Muhammad Alif Hakimi',
      source: 'Panggilan Masuk / WhatsApp',
      notes: [`[${new Date().toLocaleDateString('ms-MY')}] Inkuiri didaftarkan secara manual oleh pentadbir`],
    });

    setShowAddLeadModal(false);
    // Reset form
    setNewClientName('');
    setNewCompanyName('');
    setNewPhone('');
    setNewEmail('');
  };

  const handleSaveCompanyCms = () => {
    updateCompanyInfo(companyForm);
    setCmsSavedToast(true);
    setTimeout(() => setCmsSavedToast(false), 3000);
  };

  const handleSaveHeroCms = () => {
    updateHero(heroForm);
    setCmsSavedToast(true);
    setTimeout(() => setCmsSavedToast(false), 3000);
  };

  // =========================================================================
  // VIEW A: AUTHENTICATION LOCK SCREEN (Accessible only through alifhakimi1704@gmail.com)
  // =========================================================================
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full relative z-10">
          {/* Logo & Security Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-white shadow-xl mb-4 border border-slate-700">
              <RnfLogo size={46} variant="badge" />
            </div>
            <h1 className="font-['Outfit'] text-2xl sm:text-3xl font-black text-white tracking-tight">
              Portal Pentadbir Rahsia
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              RNF Business Solutions • Sistem CRM & Pengurusan Data
            </p>

            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Akses Terhad: <strong>{AUTHORIZED_ADMIN_EMAIL}</strong></span>
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-slate-800/90 border border-slate-700 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl">
            {authError && (
              <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-700 text-red-200 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="font-medium leading-relaxed">{authError}</div>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Emel Pentadbir Sah
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="alifhakimi1704@gmail.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  * Sistem menolak sebarang emel selain {AUTHORIZED_ADMIN_EMAIL}.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  PIN Keselamatan / Kata Laluan
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Masukkan PIN (Default: rnf2026)"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Buka Akses Backend CRM</span>
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-700/80 flex flex-col gap-2">
              {/* Quick authorized 1-click login for alifhakimi1704@gmail.com */}
              <button
                type="button"
                onClick={handleQuickLoginAsAuthorized}
                className="w-full py-2.5 px-3 bg-slate-700/60 hover:bg-slate-700 text-amber-300 hover:text-amber-200 text-xs font-bold rounded-xl border border-slate-600 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Sahkan Pantas (alifhakimi1704@gmail.com)</span>
              </button>

              <button
                type="button"
                onClick={() => navigateTo('home')}
                className="w-full py-2 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              >
                ← Kembali ke Laman Utama
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW B: AUTHENTICATED SECRET ADMIN CRM BACKEND
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col">
      {/* Top Admin Header Bar */}
      <header className="bg-[#09263b] text-white border-b border-blue-950 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <RnfLogo size={32} variant="badge" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Outfit'] font-black text-base text-white tracking-tight">
                  RNF CRM BACKEND
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black bg-amber-400 text-slate-950 uppercase tracking-wider">
                  Secret Root
                </span>
              </div>
              <div className="text-[11px] text-slate-300 flex items-center gap-1.5">
                <span>Pentadbir:</span>
                <strong className="text-amber-300">{AUTHORIZED_ADMIN_EMAIL}</strong>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowAddLeadModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Daftar Inkuiri Manual</span>
            </button>

            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold rounded-lg transition-colors cursor-pointer border border-slate-700"
              title="Lihat Laman Utama"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Laman Utama</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1 px-3 py-1.5 bg-red-900/60 hover:bg-red-800 text-red-200 hover:text-white text-xs font-bold rounded-lg transition-colors cursor-pointer border border-red-700/50"
              title="Log Keluar"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Log Keluar</span>
            </button>
          </div>
        </div>

        {/* Secondary Navigation Ribbon */}
        <div className="bg-[#0c314b] border-t border-blue-900/60 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            <button
              onClick={() => setActiveAdminTab('crm')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'crm'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>1. Inkuiri & Pipeline CRM ({leads.length})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('gsheets')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'gsheets'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>2. Segerak Google Sheets</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('testimonials')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'testimonials'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
              <span>3. Sunting Testimoni ({content.testimonials.length})</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('reporting')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'reporting'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-purple-300" />
              <span>4. Data Tracking & Laporan</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('packages')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'packages'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-300" />
              <span>5. Pakej Akaun & Payroll</span>
            </button>

            <button
              onClick={() => setActiveAdminTab('cms')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeAdminTab === 'cms'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-slate-300" />
              <span>6. Kandungan Web (CMS)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ========================================================================= */}
        {/* TAB 1: CRM INQUIRIES & PIPELINE (KANBAN & LIST VIEWS) */}
        {/* ========================================================================= */}
        {activeAdminTab === 'crm' && (
          <div className="space-y-6">
            {/* Toolbar: Kanban / List View Toggle & Metrics */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-['Outfit'] text-xl sm:text-2xl font-black text-slate-900">
                    Papan Pengurusan Inkuiri SME
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-100 text-blue-800 border border-blue-200">
                    {leads.length} Inkuiri
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tugaskan inkuiri kepada pegawai RNF, kemaskini status fasa, dan rekod nota perbualan.
                </p>
              </div>

              <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-between sm:justify-end">
                {/* Kanban vs List Switcher */}
                <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setCrmViewMode('kanban')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      crmViewMode === 'kanban'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Kanban className="w-3.5 h-3.5" />
                    <span>Kad Kanban</span>
                  </button>

                  <button
                    onClick={() => setCrmViewMode('list')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      crmViewMode === 'list'
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Senarai Jadual</span>
                  </button>
                </div>

                <button
                  onClick={() => setShowAddLeadModal(true)}
                  className="px-3.5 py-2 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Inkuiri Baharu</span>
                </button>
              </div>
            </div>

            {/* View Container */}
            {crmViewMode === 'kanban' ? (
              <CrmKanbanView
                leads={leads}
                teamMembers={teamMembers}
                onUpdateStatus={updateLeadStatus}
                onAssignLead={assignLead}
                onAddNote={addLeadNote}
                onDeleteLead={deleteLead}
              />
            ) : (
              <CrmListView
                leads={leads}
                teamMembers={teamMembers}
                onUpdateStatus={updateLeadStatus}
                onAssignLead={assignLead}
                onDeleteLead={deleteLead}
              />
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: GOOGLE SHEETS SYNC HUB */}
        {/* ========================================================================= */}
        {activeAdminTab === 'gsheets' && <GoogleSheetsSyncHub />}

        {/* ========================================================================= */}
        {/* TAB 3: EDITS ON TESTIMONIAL SECTION */}
        {/* ========================================================================= */}
        {activeAdminTab === 'testimonials' && <TestimonialsManager />}

        {/* ========================================================================= */}
        {/* TAB 4: DATA TRACKING & REPORTING MATTERS */}
        {/* ========================================================================= */}
        {activeAdminTab === 'reporting' && <ReportingAnalytics />}

        {/* ========================================================================= */}
        {/* TAB 5: PACKAGE PRICING & LIMITS EDITOR */}
        {/* ========================================================================= */}
        {activeAdminTab === 'packages' && <PackageEditor />}

        {/* ========================================================================= */}
        {/* TAB 6: GENERAL CMS CONTENT */}
        {/* ========================================================================= */}
        {activeAdminTab === 'cms' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-['Outfit'] text-xl font-bold text-slate-900">
                  Tetapan Kandungan Asas Laman Web
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Urus maklumat syarikat, alamat, nombor WhatsApp, dan tajuk utama (Hero section).
                </p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Kembalikan semua teks kepada tetapan asal RNF?')) {
                    resetToDefaults();
                    alert('Kandungan telah dipulihkan kepada lalai.');
                  }
                }}
                className="px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl border border-red-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Asal</span>
              </button>
            </div>

            {cmsSavedToast && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Kandungan berjaya disimpan!</span>
              </div>
            )}

            {/* Company Info Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Maklumat Syarikat & Perhubungan</span>
                </h4>
                <button
                  onClick={handleSaveCompanyCms}
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  <span>Simpan</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Syarikat</label>
                  <input
                    type="text"
                    value={companyForm.name}
                    onChange={(e) => setCompanyForm({ ...companyForm, name: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">No. Pendaftaran SSM</label>
                  <input
                    type="text"
                    value={companyForm.regNumber}
                    onChange={(e) => setCompanyForm({ ...companyForm, regNumber: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nombor WhatsApp (Format Antarabangsa)</label>
                  <input
                    type="text"
                    value={companyForm.whatsappNumber}
                    onChange={(e) => setCompanyForm({ ...companyForm, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Paparan No Telefon</label>
                  <input
                    type="text"
                    value={companyForm.phoneDisplay}
                    onChange={(e) => setCompanyForm({ ...companyForm, phoneDisplay: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Alamat Pejabat</label>
                  <input
                    type="text"
                    value={companyForm.address}
                    onChange={(e) => setCompanyForm({ ...companyForm, address: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Hero Section Form */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Kandungan Hero Laman Utama</span>
                </h4>
                <button
                  onClick={handleSaveHeroCms}
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-lg flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  <span>Simpan</span>
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Eyebrow (Label Atas)</label>
                  <input
                    type="text"
                    value={heroForm.eyebrow}
                    onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tajuk Utama (Headline)</label>
                  <input
                    type="text"
                    value={heroForm.headline}
                    onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Highlight Tajuk (Warna Biru)</label>
                  <input
                    type="text"
                    value={heroForm.headlineHighlight}
                    onChange={(e) => setHeroForm({ ...heroForm, headlineHighlight: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl text-blue-700 font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Penerangan Subheadline</label>
                  <textarea
                    rows={3}
                    value={heroForm.subheadline}
                    onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Manual Inquiry Lead Creation Modal */}
      {showAddLeadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <h3 className="font-['Outfit'] text-xl font-extrabold text-slate-900 mb-1">
              Daftar Inkuiri Pelanggan Baharu
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Masukkan maklumat inkuiri dari panggilan telefon, e-mel atau walk-in.
            </p>

            <form onSubmit={handleCreateLead} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Klien *</label>
                  <input
                    type="text"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Contoh: Puan Nadia"
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama Syarikat *</label>
                  <input
                    type="text"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    placeholder="Contoh: Nadia Bakery Sdn Bhd"
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jenis Entiti</label>
                  <select
                    value={newEntity}
                    onChange={(e) => setNewEntity(e.target.value as any)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl bg-white font-medium"
                  >
                    <option value="Sdn Bhd">Sdn Bhd</option>
                    <option value="Enterprise">Enterprise / Tunggal</option>
                    <option value="LLP">LLP (PLT)</option>
                    <option value="Perkongsian">Perkongsian</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">No. Telefon (WhatsApp) *</label>
                  <input
                    type="tel"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="012-3456789"
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Kategori Servis Diminati</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setNewServiceCategory('accounting');
                      setNewSelectedPackage('STARTER (RM 600)');
                      setNewDataVolume('1 to 300 Data');
                      setNewEstValue(600);
                    }}
                    className={`py-2 px-2 text-center rounded-xl border font-bold ${
                      newServiceCategory === 'accounting'
                        ? 'bg-blue-50 border-blue-600 text-blue-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Perakaunan
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewServiceCategory('payroll');
                      setNewSelectedPackage('STARTER (RM 200)');
                      setNewDataVolume('1 to 5 staff');
                      setNewEstValue(200);
                    }}
                    className={`py-2 px-2 text-center rounded-xl border font-bold ${
                      newServiceCategory === 'payroll'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Payroll Gaji
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNewServiceCategory('combo');
                      setNewSelectedPackage('Kombo Starter (RM 800)');
                      setNewDataVolume('300 data + 5 staf');
                      setNewEstValue(800);
                    }}
                    className={`py-2 px-2 text-center rounded-xl border font-bold ${
                      newServiceCategory === 'combo'
                        ? 'bg-purple-50 border-purple-600 text-purple-700'
                        : 'border-slate-200 text-slate-600'
                    }`}
                  >
                    Pakej Kombo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pakej Dipilih</label>
                  <input
                    type="text"
                    value={newSelectedPackage}
                    onChange={(e) => setNewSelectedPackage(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Volum Data / Bilangan Staf</label>
                  <input
                    type="text"
                    value={newDataVolume}
                    onChange={(e) => setNewDataVolume(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Anggaran Yuran Bulanan (RM)</label>
                <input
                  type="number"
                  value={newEstValue}
                  onChange={(e) => setNewEstValue(Number(e.target.value))}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-bold text-emerald-700"
                />
              </div>

              <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddLeadModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl shadow-sm"
                >
                  Daftar Inkuiri
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
