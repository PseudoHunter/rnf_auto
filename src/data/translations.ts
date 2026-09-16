export type Language = 'ms' | 'en';

export interface Translations {
  lang: Language;
  nav: {
    address: string;
    emailUs: string;
    callUs: string;
    whatsapp: string;
    admin: string;
    brandTag: string;
    links: {
      painPoints: string;
      services: string;
      howItWorks: string;
      costComparison: string;
      pricing: string;
      testimonials: string;
    };
    ctaQuote: string;
    ctaConsultation: string;
    mobileMenu: string;
    closeMenu: string;
    toggleLanguage: string;
  };
  hero: {
    eyebrow: string;
    badge: string;
    eInvoiceBadge?: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    stepsTitle: string;
    steps: { title: string; subtitle: string }[];
    helplineText: string;
    callAdvisor: string;
    contactAdvisor?: string;
    whatsappDirect: string;
    trustChecklist: string[];
    metricsTitle: string;
    metrics: { val: string; label: string; desc: string }[];
    ecosystemTitle: string;
    ecosystemBadges: string[];
    // Backward compat aliases
    trustSignals?: {
      saveCost: string;
      noPenalty: string;
      bankReady: string;
      certifiedAccountant: string;
    };
    stats?: {
      yearsExperience: string;
      yearsLabel: string;
      yearsSub: string;
      startingPrice: string;
      startingLabel: string;
      startingSub: string;
      avgSavings: string;
      avgSavingsLabel: string;
      avgSavingsSub: string;
      complianceRate: string;
      complianceLabel: string;
      complianceSub: string;
    };
  };
  calculator: {
    badge: string;
    quota: string;
    title: string;
    description: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    successTitle: string;
    matchedPackage: string;
    perMonth: string;
    incentiveLabel: string;
    incentiveValue: string;
    btnWhatsAppLock: string;
    btnRecheck: string;
    q1Label: string;
    q1Options: { key: string; label: string }[];
    q2Label: string;
    q2Options: { key: string; label: string; badge: string }[];
    q3Label: string;
    q3Options: { key: string; label: string; desc: string }[];
    btnCalculate: string;
    privacyGuarantee: string;
    savingsVsInHouse: string;
    annualSavingsSuffix: string;
    lhdnCompliance: string;
    auditReadyBadge: string;
    formHeading: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    btnBack: string;
    btnSubmit: string;
    submitting: string;
    hotlineNeedHelp: string;
    hotlineChat: string;
  };
  painPointsSection: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      icon: string;
      title: string;
      desc: string;
      highlight: string;
    }[];
    bannerTitle: string;
    bannerDesc: string;
    bannerBtn: string;
  };
  servicesSection: {
    badge: string;
    title: string;
    subtitle: string;
    items: {
      id: string;
      badge: string;
      tagline: string;
      title: string;
      desc: string;
      points: string[];
      icon: string;
    }[];
    askAboutPrefix: string;
    ctaInquire?: string;
    needCustomPlan?: string;
    customPlanDesc?: string;
    customPlanCta?: string;
  };
  howItWorksSection: {
    badge: string;
    title: string;
    subtitle: string;
    stepPrefix: string;
    steps: {
      step: string;
      title: string;
      desc: string;
      icon: string;
      tag: string;
    }[];
    bannerTitle: string;
    bannerDesc: string;
    bannerBtn: string;
    backlogTitle: string;
    backlogDesc: string;
    backlogBtn: string;
  };
  costComparisonSection: {
    badge: string;
    title: string;
    subtitle: string;
    inHouseTag: string;
    inHouseSub: string;
    inHouseTitle: string;
    inHouseDesc: string;
    inHouseEst: string;
    perMonth: string;
    inHouseAnnualPrefix: string;
    inHouseAnnualSuffix: string;
    inHousePainPoints: string[];
    inHouseFooter: string;
    rnfBadgeTag: string;
    rnfTag: string;
    rnfSub: string;
    rnfTitle: string;
    rnfDesc: string;
    rnfEst: string;
    rnfAnnualPrefix: string;
    rnfAnnualSuffix: string;
    rnfBenefits: string[];
    rnfBtn: string;
    annualSavingsPrefix: string;
    annualSavingsSuffix: string;
    bookAdvisoryBtn?: string;
    auditWarning?: string;
  };
  pricingSection: {
    badge: string;
    title: string;
    subtitle: string;
    tabAccounting: string;
    tabPayroll: string;
    tabBundle: string;
    popularBadge: string;
    monthlyPlan: string;
    monthly: string;
    includedHeading: string;
    selectBtnPrefix: string;
    waBtn: string;
    accountingOverLimit: string;
    accountingCustomQuote: string;
    payrollScopeHeading: string;
    payrollOverLimit: string;
    payrollCustomQuote: string;
    comboTag: string;
    comboTitle: string;
    comboDesc: string;
    comboStep1: string;
    comboStep2: string;
    comboSummaryTag: string;
    comboInHouseCompare: string;
    comboTotalFee: string;
    perMonth: string;
    comboBookBtn: string;
    comboWaBtn: string;
    backlogTitle: string;
    backlogDesc: string;
    backlogBtn: string;
  };
  testimonials: {
    badge: string;
    title: string;
    subtitle: string;
    trust1: string;
    trust2: string;
    trust3: string;
  };
  consultation: {
    badge: string;
    title: string;
    subtitle: string;
    benefitList: string[];
    guaranteeTitle: string;
    guaranteeDesc: string;
    form: {
      fullName: string;
      fullNamePh: string;
      companyName: string;
      companyNamePh: string;
      entityType: string;
      volumeOrStaff: string;
      serviceNeed: string;
      serviceOptions: string[];
      phone: string;
      phonePh: string;
      email: string;
      emailPh: string;
      preferredTime: string;
      timeOptions: string[];
      notes: string;
      notesPh: string;
      submitBtn: string;
      submitting: string;
      privacyNote: string;
    };
    success: {
      title: string;
      desc: string;
      whatsappBtn: string;
      resetBtn: string;
    };
  };
  footer: {
    brandDesc: string;
    regNo: string;
    quickLinks: string;
    servicesTitle: string;
    officeTitle: string;
    operatingHours: string;
    hoursDetail: string;
    complianceBadges: string[];
    rights: string;
    adminAccess: string;
    backToTop: string;
  };
  modal: {
    title: string;
    subtitle: string;
    close: string;
    benefits: string[];
  };
  whatsappWidget: {
    tooltip: string;
    onlineStatus: string;
    helpText: string;
    directChat: string;
  };
  // Fallbacks / legacy keys to guarantee no undefined references
  diagnostic?: any;
  painPoints?: any;
  services?: any;
  howItWorks?: any;
  costComparison?: any;
  pricing?: any;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  // ==========================================
  // BAHASA MALAYSIA: Santai tapi Profesional
  // ==========================================
  ms: {
    lang: 'ms',
    nav: {
      address: "Mercu Aspire KL, Eco City, Bangsar",
      emailUs: "info@rnfsolutions.com.my",
      callUs: "+60 17-640 4053",
      whatsapp: "WhatsApp Penasihat",
      admin: "Akses Pentadbir",
      brandTag: "Akaun • Cukai • Gaji",
      links: {
        painPoints: "Masalah SME",
        services: "Servis Kami",
        howItWorks: "Cara Kerja",
        costComparison: "Banding Kos",
        pricing: "Pakej Harga",
        testimonials: "Testimoni",
      },
      ctaQuote: "Sebut Harga Percuma",
      ctaConsultation: "Konsultasi 1-to-1",
      mobileMenu: "Buka Menu",
      closeMenu: "Tutup Menu",
      toggleLanguage: "Tukar Bahasa (EN)",
    },
    hero: {
      eyebrow: "Khas Untuk SME & Peniaga Malaysia (< RM500k Hasil)",
      badge: "Sedia e-Invois LHDN",
      eInvoiceBadge: "Sedia e-Invois LHDN",
      headline: "Urus Akaun, Cukai & Gaji Syarikat Tanpa Perlu",
      headlineHighlight: "Gaji Kerani Mahal.",
      subheadline: "Tak payah pening kepala susun resit dalam kotak kasut atau risau surat denda LHDN. Hantar je gambar resit kat WhatsApp — biar akauntan bertauliah kami siapkan rekod kemas serendah RM 600/bulan untuk pakej akaun syarikat anda.",
      stepsTitle: "4 Langkah Mudah Dapatkan Khidmat Akaun:",
      steps: [
        { title: "1. Saringan 1 Minit", subtitle: "Pilih keperluan syarikat" },
        { title: "2. Kira Jimat Kos", subtitle: "Jimat sehingga 70%" },
        { title: "3. Padanan Pakej", subtitle: "Bermula Dari RM600/bln" },
        { title: "4. Konsultasi Santai", subtitle: "Percuma bersama akauntan" },
      ],
      helplineText: "Ada soalan segera mengenai akaun atau e-Invois?",
      callAdvisor: "Hubungi Penasihat",
      contactAdvisor: "Hubungi Penasihat",
      whatsappDirect: "WhatsApp Terus",
      trustChecklist: [
        "Jimat Kos Sehingga 70%",
        "Bebas Denda LHDN & SSM",
        "Laporan Siap Untuk Bank",
        "Akauntan Bertauliah",
      ],
      metricsTitle: "REKOD PENCAPAIAN & KEPERCAYAAN SME MALAYSIA",
      metrics: [
        { val: "15+ Tahun", label: "Pengalaman Industri", desc: "Membantu ratusan pemilik bisnes & SME" },
        { val: "RM 600", label: "Pakej Bermula Dari", desc: "Pakej bulanan bermula dari RM600" },
        { val: "70%", label: "Penjimatan Kos Purata", desc: "Berbanding mengupah kerani akaun full-time" },
        { val: "100%", label: "Patuh LHDN & SSM", desc: "Bebas denda dan audit-ready sepanjang tahun" },
      ],
      ecosystemTitle: "Ekosistem Perakaunan & Pematuhan Diiktiraf:",
      ecosystemBadges: [
        "LHDN e-Invoicing Ready",
        "SSM Companies Act 2016",
        "KWSP & PERKESO Portal",
        "AutoCount & Xero Certified",
      ],
      trustSignals: {
        saveCost: "Jimat Kos Sehingga 70%",
        noPenalty: "Bebas Denda LHDN & SSM",
        bankReady: "Laporan Siap Untuk Bank",
        certifiedAccountant: "Akauntan Bertauliah",
      },
    },
    calculator: {
      badge: "Saringan Kelayakan 1 Minit",
      quota: "Slot Terhad Minggu Ini",
      title: "Kira Anggaran Jimat Kos Syarikat Anda",
      description: "Jawab 3 soalan pantas untuk padankan pakej paling jimat bagi operasi bisnes anda.",
      step1Title: "1. Profil",
      step2Title: "2. Padanan",
      step3Title: "3. Selesai",
      successTitle: "Alhamdulillah, Padanan Pakej Berjaya!",
      matchedPackage: "Pakej Disyorkan",
      perMonth: "/bulan",
      incentiveLabel: "Insentif Istimewa",
      incentiveValue: "Percuma Sesi Semakan e-Invois LHDN (Bernilai RM500)",
      btnWhatsAppLock: "Kunci Slot via WhatsApp",
      btnRecheck: "Kira Semula",
      q1Label: "1. Bentuk Entiti Perniagaan:",
      q1Options: [
        { key: "Sdn Bhd", label: "Sdn Bhd" },
        { key: "Enterprise", label: "Enterprise" },
        { key: "LLP", label: "LLP / Perkongsian" },
      ],
      q2Label: "2. Macam Mana Situasi Rekod Akaun Sekarang?",
      q2Options: [
        { key: "in_house", label: "Ada kerani in-house", badge: "Gaji Mahal RM3k+" },
        { key: "diy", label: "Buat sendiri / Bos pening", badge: "Masa Terbuang" },
        { key: "backlog", label: "Resit bertimbun berbulan", badge: "Risiko Denda" },
        { key: "loan", label: "Nak mohon pinjaman bank", badge: "Perlu Laporan Kemas" },
      ],
      q3Label: "3. Anggaran Volum Transaksi / Resit Sebulan:",
      q3Options: [
        { key: "starter", label: "Starter", desc: "1 - 300 data" },
        { key: "medium", label: "Basic", desc: "301 - 550 data" },
        { key: "high", label: "Advance", desc: "551 - 750 data" },
      ],
      btnCalculate: "Kira Anggaran Penjimatan",
      privacyGuarantee: "Data dilindungi NDA & piawaian etika akauntan bertauliah.",
      savingsVsInHouse: "Anggaran Jimat vs Gaji Staf In-House",
      annualSavingsSuffix: "/tahun",
      lhdnCompliance: "Status Pematuhan LHDN & e-Invois",
      auditReadyBadge: "100% Audit Ready",
      formHeading: "Kunci Kadar Jimat & Dapatkan Sebut Harga Rasmi",
      nameLabel: "Nama Penuh Anda",
      namePlaceholder: "cth: Muhammad Alif",
      phoneLabel: "Nombor Telefon / WhatsApp",
      phonePlaceholder: "cth: 0176404053",
      emailLabel: "Emel Perniagaan (Pilihan)",
      emailPlaceholder: "cth: alif@syarikat.com",
      btnBack: "Kembali",
      btnSubmit: "Hantar & Kunci Harga Jimat",
      submitting: "Sedang Menghantar...",
      hotlineNeedHelp: "Perlukan bantuan segera? Hubungi kami di",
      hotlineChat: "Chat WhatsApp",
    },
    painPointsSection: {
      badge: "Realiti Pemilik SME Malaysia",
      title: "Pernah Alami Masalah Ini Dalam Bisnes Anda?",
      subtitle: "Kebanyakan bos syarikat dengan hasil bawah RM500k terperangkap dengan masalah yang sama setiap bulan. Bunyi macam bisnes anda?",
      items: [
        {
          icon: "Receipt",
          title: "Resit Bersepah & Buku Tertunggak",
          desc: "Resit minyak, makan, barang mentah bersepah dalam beg plastik atau kotak kasut. Bila nak tutup akaun hujung tahun baru kelam-kabut cari satu-satu.",
          highlight: "Selesai: Snap je resit kat WhatsApp",
        },
        {
          icon: "Wallet",
          title: "Upah Kerani Terlalu Mahal",
          desc: "Gaji kerani sekarang RM2,500 - RM3,000 sebulan. Belum campur KWSP, SOCSO, bonus, cuti tahunan, dan risiko staf berhenti bila-bila masa.",
          highlight: "Selesai: Jimat sehingga 70% kos tetap",
        },
        {
          icon: "AlertTriangle",
          title: "Takut Diserbu LHDN & Kena Kompaun",
          desc: "Risau kalau silap isi borang cukai, lewat hantar penyata SSM, atau tak bersedia dengan peraturan ketat e-Invois kerajaan.",
          highlight: "Selesai: 100% patuh piawaian audit",
        },
        {
          icon: "Building",
          title: "Tak Boleh Mohon Loan Bank",
          desc: "Bila nak besarkan bisnes atau mohon overdraft bank, pegawai bank minta penyata kewangan 6 bulan yang ditandatangani akauntan bertauliah.",
          highlight: "Selesai: Laporan kemas sedia bank",
        },
      ],
      bannerTitle: "Jangan risau, biar kami selesaikan dari A sampai Z.",
      bannerDesc: "Anda fokus berniaga dan cari jualan. Semua urusan resit, buku akaun, KWSP staf, dan cukai LHDN kami uruskan serendah RM 600/bulan.",
      bannerBtn: "Dapatkan Konsultasi Percuma",
    },
    servicesSection: {
      badge: "Penyelesaian Lengkap SME",
      title: "Apa Yang Kami Uruskan Untuk Syarikat Anda",
      subtitle: "Segalanya diuruskan secara profesional, santai, dan tanpa istilah teknikal yang memeningkan kepala.",
      items: [
        {
          id: "bookkeeping",
          badge: "Paling Popular",
          tagline: "Asas Kewangan Kukuh",
          title: "Perakaunan & Simpan Kira Bulanan",
          desc: "Rekod penuh setiap sen wang masuk dan keluar. Kami susun penyata untung rugi, kunci kira-kira, dan lejar am mengikut piawaian MFRS.",
          points: [
            "Penyata Untung Rugi & Imbangan Duga bulanan",
            "Klasifikasi transaksi jualan, kos & perbelanjaan",
            "Penyelarasan lejar am mengikut piawaian MFRS",
            "Akses laporan kewangan bila-bila masa diperlukan",
          ],
          icon: "BookOpen",
        },
        {
          id: "payroll",
          badge: "Wajib Buat Majikan",
          tagline: "Staf Gembira, Bos Senang Hati",
          title: "Pengurusan Payroll & Gaji Staf",
          desc: "Kira gaji pokok, OT, elaun, dan caruman berkanun tepat pada masanya. Slip gaji digital terus ke emel staf.",
          points: [
            "Pengiraan gaji pokok, OT, elaun & potongan",
            "Jadual caruman KWSP, PERKESO, SIP & PCB bulanan",
            "Penjanaan slip gaji digital rasmi untuk setiap staf",
            "Penyediaan Borang EA tahunan untuk pekerja",
          ],
          icon: "Users",
        },
        {
          id: "tax",
          badge: "Patuh Undang-Undang",
          tagline: "Tidur Lena Tanpa Surat Amaran",
          title: "Pematuhan Cukai Syarikat & e-Invois",
          desc: "Pengiraan taksiran cukai optimum yang sah di sisi undang-undang. Bersedia sepenuhnya untuk fasa mandatori e-Invois LHDN.",
          points: [
            "Taksiran & pengiraan cukai syarikat (Borang C/PT/B)",
            "Nasihat pelepasan cukai yang sah untuk jimat kos",
            "Kesediaan integrasi MyInvois LHDN",
            "Bimbingan pematuhan peraturan SSM & Akta Syarikat 2016",
          ],
          icon: "ShieldCheck",
        },
        {
          id: "reconciliation",
          badge: "Penyata Bersih",
          tagline: "Duit Keluar Masuk Sentiasa Seimbang",
          title: "Rekonsiliasi Bank & Persediaan Audit",
          desc: "Padankan rekod sistem dengan penyata bank sebenar. Tiada lagi kehilangan transaksi atau baki terapung yang mencurigakan.",
          points: [
            "Padanan penyata bank dengan buku akaun secara teliti",
            "Pengesanan sebarang transaksi tertinggal atau caj berganda",
            "Penyediaan fail audit lengkap (Audit Working Paper)",
            "Penyata kewangan kemas untuk permohonan pinjaman bank",
          ],
          icon: "TrendingUp",
        },
      ],
      askAboutPrefix: "Tanya Mengenai",
    },
    howItWorksSection: {
      badge: "Sangat Mudah & Bebas Tekanan",
      title: "Cara Kami Beroperasi: Hanya 3 Langkah Sahaja",
      subtitle: "Tak perlu install software rumit atau belajar akaun. Serahkan kepada kami, anda fokus kembangkan bisnes.",
      stepPrefix: "Langkah",
      steps: [
        {
          step: "1",
          title: "Tangkap Gambar Resit & Invois",
          desc: "Cukup sekadar snap gambar resit guna kamera telefon pintar dan hantar ke group WhatsApp khas syarikat anda, atau muat naik ke Google Drive.",
          icon: "Camera",
          tag: "📱 Boleh snap guna telefon terus via WhatsApp",
        },
        {
          step: "2",
          title: "Akauntan Semak & Rekod Mengikut Piawaian",
          desc: "Pasukan akauntan bertauliah kami akan merekodkan transaksi, mengelaskan kos mengikut kod akaun MFRS, dan selaraskan penyata bank.",
          icon: "Cpu",
          tag: "🔒 Data selamat & disimpan secara sulit (NDA)",
        },
        {
          step: "3",
          title: "Terima Laporan Kewangan Bulanan Kemas",
          desc: "Dapatkan penyata Untung Rugi, Kunci Kira-Kira, dan analisis aliran tunai yang siap untuk tatapan anda, bank, juruaudit, dan LHDN.",
          icon: "CheckCircle",
          tag: "📊 Lengkap untung rugi & sedia e-Invois LHDN",
        },
      ],
      bannerTitle: "Ada lambakan resit lama yang belum bersusun?",
      bannerDesc: "Jangan bimbang. Pasukan kami sedia bantu 'backlog clearance' resit tertunggak tahun-tahun lepas dengan pantas dan kemas.",
      bannerBtn: "Bincang Backlog Resit",
      backlogTitle: "Ada lambakan resit lama yang belum bersusun?",
      backlogDesc: "Jangan bimbang. Pasukan kami sedia bantu 'backlog clearance' resit tertunggak tahun-tahun lepas dengan pantas dan kemas.",
      backlogBtn: "Bincang Backlog Resit",
    },
    costComparisonSection: {
      badge: "Kira Penjimatan Tunai",
      title: "Gaji Staf Akaun Sendiri vs. Ambil Pakej RNF",
      subtitle: "Untuk bisnes dengan hasil bawah RM500k, mengupah staf akaun sepenuh masa membakar aliran tunai yang sangat besar.",
      inHouseTag: "Beban Kos Tetap",
      inHouseSub: "Gaji pokok + KWSP + SOCSO + perisian",
      inHouseTitle: "Upah Kerani Akaun In-House",
      inHouseDesc: "Kos tetap bulanan yang perlu dibayar walaupun jualan bisnes sedang menurun.",
      inHouseEst: "Anggaran Kos Sebulan:",
      perMonth: "/bulan",
      inHouseAnnualPrefix: "Mencecah lebih",
      inHouseAnnualSuffix: "setahun dalam perbelanjaan tetap!",
      inHousePainPoints: [
        "Gaji pokok minimum RM 2,500 – RM 3,000 sebulan",
        "Caruman wajib KWSP (13%), SOCSO, EIS & HRDF (~RM 450/bln)",
        "Lesen software perakaunan & langganan sistem (RM 150 – RM 300/bln)",
        "Kos komputer pejabat, ruang meja, bil elektrik & latihan (~RM 300/bln)",
        "Risiko staf berhenti tiba-tiba, cuti sakit atau cuti bersalin berpanjangan",
      ],
      inHouseFooter: "* Berdasarkan purata pasaran semasa gaji kerani akaun di kawasan Lembah Klang & bandar utama.",
      rnfBadgeTag: "Penjimatan Bersih:",
      rnfTag: "Pilihan Bijak Bos SME",
      rnfSub: "Mula RM 600/bln • Sifar komitmen staf",
      rnfTitle: "Khidmat Akauntan RNF",
      rnfDesc: "Dapatkan kepakaran pasukan akauntan bertauliah pada pecahan kos gaji kerani biasa.",
      rnfEst: "Pakej Bulanan Serendah:",
      rnfAnnualPrefix: "Hanya sekitar",
      rnfAnnualSuffix: "setahun — jimat besar untuk aliran tunai!",
      rnfBenefits: [
        "Yuran bulanan tetap mengikut volum data (RM 600 – RM 1,200/bln)",
        "Sifar caruman KWSP, SOCSO, cuti tahunan, insurans atau bonus",
        "Lesen perisian perakaunan awan sedia disertakan percuma",
        "Diselia oleh akauntan bertauliah berpengalaman lebih 15 tahun",
        "Kerja berterusan tanpa henti — tiada isu cuti kecemasan atau staf berhenti",
      ],
      rnfBtn: "Kunci Penjimatan Syarikat Anda",
      annualSavingsPrefix: "Jimat sehingga",
      annualSavingsSuffix: "setahun",
    },
    pricingSection: {
      badge: "Senarai Harga Rasmi & Telus",
      title: "Pakej Akaun & Servis Payroll SME Malaysia",
      subtitle: "Struktur yuran yang jelas mengikut bilangan data transaksi dan jumlah pekerja syarikat anda. Tiada yuran tersembunyi, diurus oleh akauntan bertauliah.",
      tabAccounting: "Pakej Perakaunan (Data Volum)",
      tabPayroll: "Pakej Payroll (Staf)",
      tabBundle: "Kalkulator Kombo (Akaun + Gaji)",
      popularBadge: "Paling Popular",
      monthlyPlan: "Pelan Bulanan",
      monthly: "/bln",
      includedHeading: "Termasuk Dalam Pakej:",
      selectBtnPrefix: "Pilih Pakej",
      waBtn: "WhatsApp Penasihat",
      accountingOverLimit: "Volum data melebihi 1,100 transaksi akan diselaraskan mengikut kuota khas",
      accountingCustomQuote: "Minta Sebut Harga Khas",
      payrollScopeHeading: "Skop Servis Payroll:",
      payrollOverLimit: "Kapasiti melebihi 20 orang pekerja akan diselaraskan mengikut struktur korporat",
      payrollCustomQuote: "Runding Struktur Gaji",
      comboTag: "Kalkulator Kombo Jimat",
      comboTitle: "Padankan Pakej Perakaunan + Payroll Syarikat Anda",
      comboDesc: "Pilih pakej akaun mengikut volum transaksi dan pakej payroll mengikut bilangan staf untuk dapatkan sebut harga kombo segera:",
      comboStep1: "1. Pilih Pakej Akaun (Berasaskan Volum Data):",
      comboStep2: "2. Pilih Pakej Payroll (Berasaskan Bilangan Pekerja):",
      comboSummaryTag: "Pakej Kombo Pilihan Anda:",
      comboInHouseCompare: "Penjimatan berbanding kerani in-house (RM 3,600):",
      comboTotalFee: "Jumlah Pelaburan Bulanan:",
      perMonth: "/bln",
      comboBookBtn: "Kunci Tawaran Kombo Ini",
      comboWaBtn: "Hantar Sebut Harga ke WhatsApp",
      backlogTitle: "Ada Lambakan Resit Tertunggak Tahun Lepas?",
      backlogDesc: "Jangan panik. Kami sediakan servis Backlog Clearance untuk menyusun semula akaun lama anda dengan kemas dan audit-ready sebelum tarikh akhir LHDN.",
      backlogBtn: "Dapatkan Sebut Harga Backlog",
    },
    testimonials: {
      badge: "Kisah Kejayaan Pelanggan",
      title: "Apa Kata Pemilik Bisnes Yang Menggunakan RNF",
      subtitle: "Dari butik fesyen hingga pemilik kafe dan bengkel kereta, mereka kini tidur lena tanpa pening kepala hal akaun.",
      trust1: "100% Pematuhan LHDN & SSM",
      trust2: "Laporan Siap Dalam 7 Hari Bekerja",
      trust3: "Disokong Pasukan Akauntan Bertauliah",
    },
    consultation: {
      badge: "Slot Terhad Minggu Ini",
      title: "Tempah Sesi Konsultasi Percuma & Sebut Harga Segera",
      subtitle: "Tiada sebarang bayaran atau komitmen terikat. Sembang santai dengan penasihat kewangan kami untuk tahu pelan paling jimat untuk syarikat anda.",
      benefitList: [
        "Analisis pantas struktur kos akaun syarikat anda",
        "Anggaran penjimatan tunai berbanding upah staf sendiri",
        "Panduan pematuhan asas cukai syarikat & e-Invois LHDN",
        "Cadangan perisian simpan kira terbaik untuk bisnes anda",
      ],
      guaranteeTitle: "100% Kerahsiaan Terpelihara",
      guaranteeDesc: "Semua maklumat kewangan yang dikongsi adalah tertakluk kepada etika kerahsiaan akauntan bertauliah.",
      form: {
        fullName: "Nama Penuh Anda",
        fullNamePh: "cth: Muhammad Alif",
        companyName: "Nama Syarikat / Perniagaan",
        companyNamePh: "cth: Rasa Impian Cafe Sdn Bhd",
        entityType: "Bentuk Entiti Perniagaan",
        volumeOrStaff: "Anggaran Volum Resit / Bilangan Staf",
        serviceNeed: "Servis Utama Yang Diperlukan",
        serviceOptions: [
          "Pakej Perakaunan & Simpan Kira (RM600 - RM1200)",
          "Pengurusan Payroll & Gaji Staf (RM200 - RM500)",
          "Pakej Kombo Lengkap (Akaun + Payroll)",
          "Backlog Clearance Resit Tahun Lepas",
          "Pematuhan Cukai & Persediaan e-Invois LHDN",
        ],
        phone: "Nombor Telefon / WhatsApp",
        phonePh: "cth: 0176404053",
        email: "Emel Rasmi Perniagaan",
        emailPh: "cth: alif@rasaimpian.com.my",
        preferredTime: "Waktu Sesi Konsultasi Yang Sesuai",
        timeOptions: [
          "Pagi (10:00 AM – 1:00 PM)",
          "Petang (2:30 PM – 5:30 PM)",
          "Malam (8:30 PM – 10:00 PM)",
        ],
        notes: "Nota Tambahan (Jika Ada)",
        notesPh: "Kongsi sedikit cabaran akaun atau soalan khusus anda...",
        submitBtn: "Hantar & Tempah Sesi Percuma",
        submitting: "Sedang Menghantar Maklumat...",
        privacyNote: "🔒 Maklumat anda dilindungi dengan enkripsi selamat. Kami tidak akan berkongsi data anda kepada pihak ketiga.",
      },
      success: {
        title: "Permohonan Anda Telah Berjaya Diterima!",
        desc: "Pegawai perakaunan kami akan menghubungi anda melalui WhatsApp dalam masa beberapa minit untuk mengesahkan sesi sembang santai anda.",
        whatsappBtn: "Hantar Salinan ke WhatsApp RNF Sekarang",
        resetBtn: "Hantar Permohonan Lain",
      },
    },
    footer: {
      brandDesc: "Membantu pemilik SME & Enterprise Malaysia menjimatkan sehingga 70% kos kerani akaun, memastikan 100% kepatuhan cukai LHDN & e-Invois, serta menyediakan laporan kewangan kemas sedia bank.",
      regNo: "Pendaftaran SSM: 202403129845 (003601234-A) • MFRS Compliant",
      quickLinks: "Pautan Pantas",
      servicesTitle: "Perkhidmatan Kami",
      officeTitle: "Pejabat & Perhubungan",
      operatingHours: "Waktu Operasi",
      hoursDetail: "",
      complianceBadges: [
        "MFRS Compliant",
        "Companies Act 2016",
        "LHDN e-Invoicing Ready",
        "MIA Member Supervised",
      ],
      rights: "Hak cipta terpelihara. Pendaftaran SSM Malaysia.",
      adminAccess: "Akses Pentadbir",
      backToTop: "Kembali ke Atas",
    },
    modal: {
      title: "Tempah Sesi Semakan Kewangan Percuma 30 Minit",
      subtitle: "Bincang bersama akauntan berpengalaman untuk diagnosis status akaun, potensi penjimatan kos cukai, dan pelan penyusunan dokumen syarikat anda.",
      close: "Tutup",
      benefits: [
        "Diagnosis percuma status rekod kewangan syarikat",
        "Anggaran tepat penjimatan kos bulanan berbanding kerani in-house",
        "Panduan langkah demi langkah persediaan e-Invois LHDN",
        "Tiada sebarang caj tersembunyi atau ikatan kontrak",
      ],
    },
    whatsappWidget: {
      tooltip: "Ada soalan akaun atau gaji? WhatsApp kami sekarang!",
      onlineStatus: "Akauntan Bertugas Sedang Online",
      helpText: "Boleh tanya apa sahaja soalan tentang pakej akaun, cukai LHDN, atau e-Invois secara santai.",
      directChat: "Mula Chat WhatsApp",
    },
  },

  // ==========================================
  // ENGLISH: Highly Professional Corporate Tone
  // ==========================================
  en: {
    lang: 'en',
    nav: {
      address: "Mercu Aspire KL, Eco City, Bangsar",
      emailUs: "info@rnfsolutions.com.my",
      callUs: "+60 17-640 4053",
      whatsapp: "WhatsApp Advisor",
      admin: "Admin Access",
      brandTag: "Accounting • Tax • Payroll",
      links: {
        painPoints: "SME Challenges",
        services: "Our Services",
        howItWorks: "How It Works",
        costComparison: "Cost Analysis",
        pricing: "Pricing Packages",
        testimonials: "Client Reviews",
      },
      ctaQuote: "Get Free Quote",
      ctaConsultation: "1-on-1 Consultation",
      mobileMenu: "Open Navigation Menu",
      closeMenu: "Close Navigation Menu",
      toggleLanguage: "Switch Language (BM)",
    },
    hero: {
      eyebrow: "Tailored for Malaysian SMEs & Growing Enterprises (< RM500k Revenue)",
      badge: "LHDN e-Invoicing Ready",
      eInvoiceBadge: "LHDN e-Invoicing Ready",
      headline: "Streamline Corporate Accounts, Tax & Payroll",
      headlineHighlight: "Without In-House Overhead.",
      subheadline: "Eliminate administrative friction, unsorted invoices, and tax non-compliance penalties. Simply transmit records via WhatsApp — our certified accounting professionals administer complete bookkeeping and compliance starting from RM 600/month.",
      stepsTitle: "Four Steps to Seamless Financial Compliance:",
      steps: [
        { title: "1. 60-Sec Screening", subtitle: "Select entity requirements" },
        { title: "2. Cost Evaluation", subtitle: "Cut overhead up to 70%" },
        { title: "3. Tier Matching", subtitle: "Starting From RM600/mo" },
        { title: "4. Advisory Session", subtitle: "Complimentary with partner" },
      ],
      helplineText: "Need immediate guidance on bookkeeping or e-Invoicing?",
      callAdvisor: "Call Senior Advisor",
      contactAdvisor: "Contact Senior Advisor",
      whatsappDirect: "Direct WhatsApp",
      trustChecklist: [
        "Save Up To 70% Overhead",
        "Zero LHDN & SSM Penalties",
        "Bank-Ready Audit Ledgers",
        "Chartered Accountants",
      ],
      metricsTitle: "TRACK RECORD & MALAYSIAN SME TRUST METRICS",
      metrics: [
        { val: "15+ Years", label: "Industry Practice", desc: "Advising hundreds of Malaysian entrepreneurs" },
        { val: "RM 600", label: "Starting Packages", desc: "Retainer packages from RM600/month" },
        { val: "70%", label: "Average Cost Reduction", desc: "Compared to full-time in-house bookkeeper" },
        { val: "100%", label: "LHDN & SSM Compliance", desc: "Zero penalties and perpetual audit-readiness" },
      ],
      ecosystemTitle: "Accredited Accounting & Statutory Ecosystem:",
      ecosystemBadges: [
        "LHDN e-Invoicing Ready",
        "SSM Companies Act 2016",
        "EPF & SOCSO Portal",
        "AutoCount & Xero Certified",
      ],
      trustSignals: {
        saveCost: "Save Up To 70% Overhead",
        noPenalty: "Zero LHDN & SSM Penalties",
        bankReady: "Bank-Ready Audit Ledgers",
        certifiedAccountant: "Chartered Accountants",
      },
    },
    calculator: {
      badge: "60-Second Eligibility Screen",
      quota: "Limited Weekly Advisory Slots",
      title: "Calculate Your Corporate Cost Savings",
      description: "Answer 3 quick questions to identify the ideal package tier and your estimated monthly overhead reduction.",
      step1Title: "1. Entity",
      step2Title: "2. Matching",
      step3Title: "3. Complete",
      successTitle: "Package Match Successfully Confirmed!",
      matchedPackage: "Recommended Tier",
      perMonth: "/month",
      incentiveLabel: "Complimentary Incentive",
      incentiveValue: "Free LHDN e-Invoicing Readiness Audit (RM500 Value)",
      btnWhatsAppLock: "Lock Package via WhatsApp",
      btnRecheck: "Recalculate",
      q1Label: "1. Business Legal Entity:",
      q1Options: [
        { key: "Sdn Bhd", label: "Sdn Bhd" },
        { key: "Enterprise", label: "Enterprise" },
        { key: "LLP", label: "LLP / Partnership" },
      ],
      q2Label: "2. Current Accounting Setup:",
      q2Options: [
        { key: "in_house", label: "In-house clerk", badge: "High Cost RM3k+" },
        { key: "diy", label: "DIY / Founder bookkeeping", badge: "Time Consuming" },
        { key: "backlog", label: "Backlog of receipts", badge: "Penalty Risk" },
        { key: "loan", label: "Bank loan application", badge: "Audited Ledger Needed" },
      ],
      q3Label: "3. Estimated Monthly Transaction Volume:",
      q3Options: [
        { key: "starter", label: "Starter", desc: "1 - 300 data" },
        { key: "medium", label: "Basic", desc: "301 - 550 data" },
        { key: "high", label: "Advance", desc: "551 - 750 data" },
      ],
      btnCalculate: "Calculate Overhead Savings",
      privacyGuarantee: "All records protected by strict professional non-disclosure protocols.",
      savingsVsInHouse: "Estimated Savings vs Full-Time Clerk",
      annualSavingsSuffix: "/year",
      lhdnCompliance: "LHDN & e-Invoicing Status",
      auditReadyBadge: "100% Audit Ready",
      formHeading: "Confirm Promotional Rate & Receive Official Proposal",
      nameLabel: "Full Name / Director",
      namePlaceholder: "e.g. Muhammad Alif",
      phoneLabel: "Phone / WhatsApp Number",
      phonePlaceholder: "e.g. 0176404053",
      emailLabel: "Corporate Email (Optional)",
      emailPlaceholder: "e.g. alif@company.com.my",
      btnBack: "Back",
      btnSubmit: "Submit & Secure Promotional Rate",
      submitting: "Submitting Details...",
      hotlineNeedHelp: "Need immediate assistance? Contact our desk at",
      hotlineChat: "WhatsApp Chat",
    },
    painPointsSection: {
      badge: "Realities for Malaysian SMEs",
      title: "Experiencing These Accounting Bottlenecks?",
      subtitle: "Most SME business owners generating under RM500k face recurrent friction each month. Does this reflect your operations?",
      items: [
        {
          icon: "Receipt",
          title: "Scattered Invoices & Backlog Ledgers",
          desc: "Fuel, dining, and supplier receipts accumulate in boxes or plastic folders, forcing chaotic year-end scrambling right before tax deadlines.",
          highlight: "Solved: Transmit receipts via WhatsApp",
        },
        {
          icon: "Wallet",
          title: "Excessive In-House Clerk Overhead",
          desc: "Full-time junior bookkeepers demand RM2,500 - RM3,000 monthly, plus EPF, SOCSO, leave allowances, and unpredictable turnover risks.",
          highlight: "Solved: Reduce fixed costs up to 70%",
        },
        {
          icon: "AlertTriangle",
          title: "Vulnerability to LHDN Penalties",
          desc: "Anxiety regarding misfiled tax schedules, overdue SSM returns, or non-readiness for mandatory statutory e-Invoicing enforcement.",
          highlight: "Solved: 100% audit-compliant standards",
        },
        {
          icon: "Building",
          title: "Impeded Bank Facility Approvals",
          desc: "Seeking commercial credit or overdrafts requires 6 months of professionally reconciled ledgers countersigned by accredited accountants.",
          highlight: "Solved: Clean bank-ready statements",
        },
      ],
      bannerTitle: "Focus on growing revenue; leave the books to certified partners.",
      bannerDesc: "Focus on commercial execution while our team handles receipts, ledger compliance, staff payroll, and LHDN obligations starting from RM 600/mo.",
      bannerBtn: "Claim Free Advisory Consultation",
    },
    servicesSection: {
      badge: "Comprehensive SME Suite",
      title: "Executive Accounting Services We Deliver",
      subtitle: "Executed with rigorous professional diligence, accessible reporting, and zero confusing technical jargon.",
      items: [
        {
          id: "bookkeeping",
          badge: "Most Popular",
          tagline: "Solid Financial Foundations",
          title: "Monthly Bookkeeping & Management Accounts",
          desc: "Precise reconciliation of every inward and outward transaction. Structured Balance Sheets, P&L schedules, and ledgers aligned with MFRS.",
          points: [
            "Monthly Profit & Loss, Balance Sheet & Trial Balance",
            "Classification of sales revenue, cost of goods & expenses",
            "General ledger maintenance conforming to MFRS guidelines",
            "On-demand cloud access to historical financial schedules",
          ],
          icon: "BookOpen",
        },
        {
          id: "payroll",
          badge: "Mandatory for Employers",
          tagline: "Punctual Remittances, Content Staff",
          title: "Staff Payroll & Statutory Remittance",
          desc: "Accurate computation of base salaries, overtime, allowances, and statutory schedules with digital payslips dispatched directly to staff.",
          points: [
            "Basic salary, overtime, allowance & deduction calculations",
            "EPF, SOCSO, EIS & monthly PCB tax deduction schedules",
            "Formal digital payslip generation for every employee",
            "Year-end preparation of Employee EA Forms",
          ],
          icon: "Users",
        },
        {
          id: "tax",
          badge: "Regulatory Assured",
          tagline: "Peace of Mind Before Deadlines",
          title: "Corporate Tax Governance & e-Invoicing",
          desc: "Strategic, legally compliant corporate tax planning ensuring early filing and frictionless readiness for LHDN MyInvois integration.",
          points: [
            "Corporate tax computation & filing (Form C/PT/B)",
            "Strategic advisory on eligible capital allowances and deductions",
            "Seamless transition roadmaps for mandatory LHDN e-Invoicing",
            "SSM Companies Act 2016 statutory governance compliance",
          ],
          icon: "ShieldCheck",
        },
        {
          id: "reconciliation",
          badge: "Balanced Ledgers",
          tagline: "Flawless Cashflow Integrity",
          title: "Bank Reconciliation & Audit Preparation",
          desc: "Systematic matching between bank records and financial ledgers, eliminating missing entries, uncredited cheques, or duplicate charges.",
          points: [
            "Comprehensive monthly bank and merchant account matching",
            "Detection of duplicate bank charges or unrecorded transactions",
            "Complete Audit Working Paper preparation for external review",
            "Clean balance sheets prepared specifically for commercial loan applications",
          ],
          icon: "TrendingUp",
        },
      ],
      askAboutPrefix: "Inquire About",
    },
    howItWorksSection: {
      badge: "Straightforward & Frictionless",
      title: "Our 3-Step Onboarding Workflow",
      subtitle: "No intricate software setups or bookkeeping knowledge needed. We manage execution so you can scale your enterprise.",
      stepPrefix: "Step",
      steps: [
        {
          step: "1",
          title: "Capture Invoices & Receipts",
          desc: "Simply take a smartphone photo of expense receipts and bills and upload to your dedicated company WhatsApp thread or cloud folder.",
          icon: "Camera",
          tag: "📱 Transmit directly via dedicated WhatsApp thread",
        },
        {
          step: "2",
          title: "Automated Ledger Reconciliation",
          desc: "Your documents and expenditures are automatically verified and categorised under standard MFRS chart of accounts, and bank statements are reconciled.",
          icon: "Cpu",
          tag: "🔒 Rigorously protected under corporate NDA protocols",
        },
        {
          step: "3",
          title: "Receive Management Financial Statements",
          desc: "Review reconciled Profit & Loss schedules, Balance Sheets, and cash flow insights pre-formatted for banks, auditors, and LHDN.",
          icon: "CheckCircle",
          tag: "📊 Complete P&L statements, ready for LHDN e-Invoicing",
        },
      ],
      bannerTitle: "Accumulated unorganized receipts from previous quarters?",
      bannerDesc: "Do not worry. Our specialists provide prompt, thorough Backlog Clearance to bring overdue financial years up to date.",
      bannerBtn: "Discuss Backlog Clearance",
      backlogTitle: "Accumulated unorganized receipts from previous quarters?",
      backlogDesc: "Do not worry. Our specialists provide prompt, thorough Backlog Clearance to bring overdue financial years up to date.",
      backlogBtn: "Discuss Backlog Clearance",
    },
    costComparisonSection: {
      badge: "Quantitative Cost Analysis",
      title: "In-House Bookkeeper vs. RNF Retainer Model",
      subtitle: "For enterprises generating under RM500k, hiring a dedicated in-house bookkeeper creates disproportionate overhead.",
      inHouseTag: "Fixed Cost Overhead",
      inHouseSub: "Base salary + EPF + SOCSO + licensing",
      inHouseTitle: "In-House Accounting Clerk",
      inHouseDesc: "Rigid monthly fixed expenses incurred regardless of fluctuations in business turnover.",
      inHouseEst: "Estimated Monthly Outlay:",
      perMonth: "/month",
      inHouseAnnualPrefix: "Reaches exceeding",
      inHouseAnnualSuffix: "annually in fixed administrative overhead!",
      inHousePainPoints: [
        "Entry-level base compensation of RM 2,500 – RM 3,000 monthly",
        "Mandatory employer EPF (13%), SOCSO, EIS & HRDF levies (~RM 450/mo)",
        "Accounting software licenses and desktop subscriptions (RM 150 – RM 300/mo)",
        "Office workstation, computing hardware, utilities, and training (~RM 300/mo)",
        "Vulnerability to abrupt resignation, turnover, or prolonged medical leave",
      ],
      inHouseFooter: "* Based on contemporary market averages for accounting staff within the Greater Klang Valley area.",
      rnfBadgeTag: "Net Annual Savings:",
      rnfTag: "Strategic SME Decision",
      rnfSub: "From RM 600/mo • Zero employment liabilities",
      rnfTitle: "RNF Managed Corporate Retainer",
      rnfDesc: "Gain access to an entire team of certified accountants at a fraction of an individual clerk's salary.",
      rnfEst: "Retainer Starting At:",
      rnfAnnualPrefix: "Totalling only approx.",
      rnfAnnualSuffix: "annually — preserving critical operating liquidity!",
      rnfBenefits: [
        "Fixed monthly retainer calibrated by transaction volume (RM 600 – RM 1,200/mo)",
        "Zero EPF, SOCSO, annual leave, health benefits, or bonus liabilities",
        "Enterprise cloud accounting software subscriptions bundled at no additional cost",
        "Oversight by accredited senior accountants with 15+ years of practical tenure",
        "Uninterrupted corporate continuity with zero downtime from staff leaves",
      ],
      rnfBtn: "Lock In Your Corporate Savings",
      annualSavingsPrefix: "Save up to",
      annualSavingsSuffix: "annually",
    },
    pricingSection: {
      badge: "Official & Transparent Pricing Structure",
      title: "Corporate Bookkeeping & Payroll Retainers for Malaysian SMEs",
      subtitle: "Transparent tier structures established strictly according to monthly transaction data volume and corporate headcount. Zero hidden charges, led by chartered accountants.",
      tabAccounting: "Accounting Retainers (Data Volume)",
      tabPayroll: "Payroll Services (Headcount)",
      tabBundle: "Combo Calculator (Accounts + Payroll)",
      popularBadge: "Most Popular",
      monthlyPlan: "Monthly Plan",
      monthly: "/mo",
      includedHeading: "Included Retainer Scope:",
      selectBtnPrefix: "Select Package",
      waBtn: "WhatsApp Advisor",
      accountingOverLimit: "Data exceeding 1,100 transactions will be tailored under a customized volume quote",
      accountingCustomQuote: "Request Custom Volume Quote",
      payrollScopeHeading: "Payroll Retainer Scope:",
      payrollOverLimit: "Staff headcount exceeding 20 employees will be tailored under a corporate enterprise structure",
      payrollCustomQuote: "Discuss Corporate Payroll",
      comboTag: "Value Bundle Calculator",
      comboTitle: "Configure Combined Accounting + Payroll Package",
      comboDesc: "Select your monthly transaction volume tier and staff headcount tier to view immediate combined retainer figures:",
      comboStep1: "1. Select Accounting Tier (By Data Volume):",
      comboStep2: "2. Select Payroll Tier (By Staff Headcount):",
      comboSummaryTag: "Selected Corporate Bundle:",
      comboInHouseCompare: "Savings vs In-House Bookkeeper (RM 3,600/mo):",
      comboTotalFee: "Combined Monthly Investment:",
      perMonth: "/mo",
      comboBookBtn: "Lock This Corporate Bundle",
      comboWaBtn: "Forward Proposal to WhatsApp",
      backlogTitle: "Historical Receipt & Ledger Backlog from Prior Years?",
      backlogDesc: "Do not panic. We provide dedicated Backlog Clearance to reconstruct messy accounting books into pristine, audit-ready financial schedules before tax scrutiny.",
      backlogBtn: "Request Backlog Quotation",
    },
    testimonials: {
      badge: "Verified Client Reviews",
      title: "Trusted by Malaysian SME Directors & Founders",
      subtitle: "From culinary groups to automotive workshops and retail chains, our clients operate with full financial confidence.",
      trust1: "100% LHDN & SSM Statutory Compliance",
      trust2: "7-Day Working Turnaround on Statements",
      trust3: "Supervised by Accredited Senior Accountants",
    },
    consultation: {
      badge: "Limited Consultations This Week",
      title: "Schedule Your Complimentary Diagnostic & Prompt Quote",
      subtitle: "Zero fees or binding contractual commitments. Conduct an executive session with our senior advisors to define the leanest setup for your business.",
      benefitList: [
        "Instant diagnostic appraisal of current accounting overhead",
        "Accurate quantitative savings roadmap versus hiring internally",
        "Comprehensive statutory checklist for LHDN tax & e-Invoicing",
        "Professional recommendation of suitable cloud accounting systems",
      ],
      guaranteeTitle: "100% Corporate Confidentiality Guaranteed",
      guaranteeDesc: "All financial data shared is protected under strict professional accounting ethical secrecy guidelines and non-disclosure standards.",
      form: {
        fullName: "Full Name / Director",
        fullNamePh: "e.g. Muhammad Alif",
        companyName: "Registered Company Name",
        companyNamePh: "e.g. Rasa Impian Cafe Sdn Bhd",
        entityType: "Legal Business Entity",
        volumeOrStaff: "Estimated Monthly Receipts / Team Size",
        serviceNeed: "Primary Objective / Focus Area",
        serviceOptions: [
          "Monthly Bookkeeping & Accounts (RM600 - RM1200)",
          "Staff Payroll & Remittance (RM200 - RM500)",
          "Comprehensive Full-Suite Bundle (Accounts + Payroll)",
          "Historical Backlog Record Clearance",
          "Corporate Tax Governance & LHDN e-Invoicing",
        ],
        phone: "Mobile / WhatsApp Contact",
        phonePh: "e.g. +60176404053",
        email: "Official Corporate Email",
        emailPh: "e.g. alif@rasaimpian.com.my",
        preferredTime: "Preferred Consultation Window",
        timeOptions: [
          "Morning (10:00 AM – 1:00 PM)",
          "Afternoon (2:30 PM – 5:30 PM)",
          "Evening (8:30 PM – 10:00 PM)",
        ],
        notes: "Additional Context / Specific Requirements",
        notesPh: "Share brief notes regarding your current financial backlog or timeline...",
        submitBtn: "Submit & Confirm Advisory Slot",
        submitting: "Submitting Details...",
        privacyNote: "🔒 Your records are encrypted and protected. Data is never disclosed to external third parties.",
      },
      success: {
        title: "Consultation Request Received Successfully!",
        desc: "Our senior accounting partner will connect via WhatsApp within minutes to confirm your scheduled diagnostic session.",
        whatsappBtn: "Forward Direct Copy to RNF WhatsApp",
        resetBtn: "Submit Another Request",
      },
    },
    footer: {
      brandDesc: "Empowering Malaysian SMEs and growing enterprises to reduce accounting overhead by up to 70%, uphold 100% LHDN and e-Invoicing compliance, and maintain bank-grade financial ledgers.",
      regNo: "SSM Registration: 202403129845 (003601234-A) • MFRS Compliant",
      quickLinks: "Quick Links",
      servicesTitle: "Our Services",
      officeTitle: "Corporate Office & Inquiries",
      operatingHours: "Operating Hours",
      hoursDetail: "",
      complianceBadges: [
        "MFRS Compliant",
        "Companies Act 2016",
        "LHDN e-Invoicing Ready",
        "MIA Member Supervised",
      ],
      rights: "All rights reserved. SSM Registered in Malaysia.",
      adminAccess: "Administrator Portal",
      backToTop: "Back to Top",
    },
    modal: {
      title: "Schedule Your Complimentary 30-Minute Financial Audit",
      subtitle: "Meet with an accredited senior accountant to evaluate existing financial records, identify tax deductions, and establish an organized bookkeeping roadmap.",
      close: "Close",
      benefits: [
        "Complimentary diagnostic evaluation of current accounting status",
        "Accurate quantitative breakdown of in-house vs outsource savings",
        "Step-by-step roadmap for LHDN e-Invoicing transition compliance",
        "Zero hidden fees or binding lock-in contractual obligations",
      ],
    },
    whatsappWidget: {
      tooltip: "Have questions on accounts or payroll? WhatsApp us now!",
      onlineStatus: "Senior Accounting Advisor Online",
      helpText: "Feel free to ask any questions regarding monthly bookkeeping, tax compliance, or e-Invoicing.",
      directChat: "Start WhatsApp Chat",
    },
  },
};
