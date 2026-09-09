import { ServicePillar, CaseStudy, PricingTier } from '../types';

export const COMPANY_INFO = {
  name: "RNF Business Solutions",
  tagline: "Khidmat Akaun, Cukai, Gaji & e-Invois Lengkap Untuk SME Malaysia",
  regNumber: "201801042918 (1306950-V)",
  experienceYears: "15+",
  reconciledCapital: "RM 5,000,000+",
  arBacklogCleared: "RM 2.6M+",
  taxEfficiencyUnlocked: "RM 1.0M+",
  costSavingsRate: "Sehingga 70%",
  auditReadyRate: "100%",
  phone: "+60 11-5129 1786",
  phoneDisplay: "011-5129 1786",
  whatsappNumber: "601151291786",
  whatsappDisplay: "+60 11-5129 1786",
  email: "info@rnfbusinesssolutions.com",
  address: "Unit 21-01, Level 21, Mercu Aspire KL, Eco City, No 3 Jalan Bangsar, 59200, Kuala Lumpur",
  operatingHours: "Isnin – Jumaat: 9:00 AM – 6:00 PM",
};

export const SME_PAIN_POINTS = [
  {
    icon: "Receipt",
    title: "Resit Bersepah & Tak Sempat Susun",
    desc: "Sibuk berniaga sampai resit bersepah dalam kotak kasut atau kereta. Bila nak tahu untung rugi sebenar, kepala terus pening.",
    highlight: "Selesaikan resit",
  },
  {
    icon: "Wallet",
    title: "Gaji Staf Akaun Terlalu Mahal",
    desc: "Gaji kerani akaun sekarang RM2,500 - RM3,500 sebulan, belum campur KWSP & SOCSO. Beban berat untuk bisnes bawah RM500k.",
    highlight: "Jimat hingga 70%",
  },
  {
    icon: "AlertTriangle",
    title: "Takut Denda LHDN & Serabut e-Invois",
    desc: "Risau kena kompaun sebab lambat declare cukai atau tak tahu cara daftar dan guna sistem e-Invois LHDN yang terkini.",
    highlight: "100% Patuh LHDN",
  },
  {
    icon: "Building",
    title: "Loan Bank Sangkut Sebab Tiada Penyata",
    desc: "Bila nak mohon pinjaman modal atau beli kenderaan syarikat, bank tolak sebab tiada rekod perakaunan rasmi yang kemas.",
    highlight: "Laporan Bank-Ready",
  },
];

export const TRUST_PROOF_STATS = [
  {
    value: "15+ Tahun",
    label: "Pengalaman Urus Akaun",
    subtext: "Membantu ratusan pemilik bisnes & SME Malaysia",
  },
  {
    value: "RM 299",
    label: "Pakej Bermula Dari",
    subtext: "Penyelesaian lengkap tanpa perlu gaji staf akaun",
  },
  {
    value: "100%",
    label: "Patuh Cukai LHDN",
    subtext: "Rekod tersusun, sedia e-Invois & bebas penalti",
  },
  {
    value: "3 Langkah",
    label: "Proses Sangat Mudah",
    subtext: "Snap resit via WhatsApp, kami uruskan segalanya",
  },
];

export const SME_SERVICES = [
  {
    id: "simpan-kira",
    title: "Simpan Kira & Buku Akaun (Bookkeeping)",
    tagline: "Tiada Lagi Resit Bersepah",
    desc: "Kami masukkan semua resit perbelanjaan, invois jualan, dan seimbangkan penyata bank syarikat anda setiap bulan.",
    points: [
      "Kemasukan rekod belian, jualan & perbelanjaan",
      "Penyelarasan penyata bank (Bank Reconciliation)",
      "Penyata Untung Rugi & Neraca Imbangan bulanan",
      "Simpanan rekod digital selamat di sistem Cloud",
    ],
    icon: "BookOpen",
    badge: "Paling Penting",
  },
  {
    id: "cukai-einvoice",
    title: "Cukai Syarikat & e-Invois LHDN",
    tagline: "Tenang & Bebas Denda",
    desc: "Pastikan syarikat anda mematuhi peraturan cukai LHDN terkini dan bersedia sepenuhnya dengan pelaksanaan e-Invois.",
    points: [
      "Bantuan pendaftaran & penggunaan e-Invois MyInvois",
      "Kira cukai dengan tepat & elak bayar lebih",
      "Maksimumkan pelepasan belanja yang dibenarkan LHDN",
      "Peringatan tarikh akhir serahan borang cukai",
    ],
    icon: "ShieldCheck",
    badge: "Wajib 2026/2027",
  },
  {
    id: "payroll-kwsp",
    title: "Gaji Staf, KWSP, SOCSO & PCB",
    tagline: "Slip Gaji Siap Tepat Masa",
    desc: "Uruskan gaji pekerja setiap bulan bersama caruman wajib kerajaan tanpa perlu pening mengira formula potong gaji.",
    points: [
      "Pengiraan gaji bersih, OT & elaun pekerja",
      "Slip gaji bulanan digital untuk setiap staf",
      "Urus bayaran caruman KWSP, SOCSO & EIS sebelum 15hb",
      "Penyediaan Borang EA & Borang E tahunan",
    ],
    icon: "Users",
    badge: "Jimat Masa",
  },
  {
    id: "bank-loan",
    title: "Laporan Bersih Untuk Pinjaman Bank",
    tagline: "Senang Lulus Loan & Geran",
    desc: "Sediakan set penyata kewangan yang cantik dan dipercayai oleh pihak bank (Maybank, CIMB, RHB, BSN) dan agensi geran.",
    points: [
      "Penyata kewangan lengkap berserta ringkasan eksekutif",
      "Sesuai untuk permohonan pinjaman modal pusingan & kenderaan",
      "Dokumentasi kemas untuk geran perniagaan SME",
      "Bimbingan cara tunjuk aliran tunai yang sihat kepada bank",
    ],
    icon: "TrendingUp",
    badge: "Mudah Lulus",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "1",
    title: "Snap & Hantar Resit",
    desc: "Ambil gambar resit, invois atau forward fail penyata bank melalui WhatsApp atau Google Drive yang kami sediakan.",
    icon: "Camera",
  },
  {
    step: "2",
    title: "Kami Proses & Kemas Akaun",
    desc: "Akauntan profesional RNF semak, kategorikan, dan masukkan semua transaksi ke dalam sistem perakaunan.",
    icon: "Cpu",
  },
  {
    step: "3",
    title: "Terima Laporan Siap & Tenang",
    desc: "Setiap bulan anda terima laporan untung rugi yang jelas, slip gaji staf siap, dan nasihat jimat cukai terus dari akauntan.",
    icon: "CheckCircle",
  },
];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "starter",
    name: "Pakej Mikro / Enterprise",
    badge: "Untuk Bisnes Kecil & Online",
    monthlyPrice: 299,
    annualPriceMonthly: 249,
    targetProfile: "Enterprise, Sole Proprietor, Peniaga Online (< RM150k setahun)",
    transactionLimit: "Hingga 50 Transaksi / Bulan",
    features: [
      "Simpan Kira Bulanan Lengkap (Bookkeeping)",
      "Penyelarasan 1 Akaun Bank",
      "Laporan Untung Rugi Bulanan Mudah Faham",
      "Simpanan Rekod Resit Digital Selamat",
      "Bimbingan Asas Cukai & Pelepasan Belanja",
      "Bantuan Sokongan Melalui WhatsApp",
    ],
    statutoryCoverage: [
      "Penyata Untung Rugi Bulanan",
      "Panduan Borang B / BE LHDN",
      "Tiada Caj Tersembunyi",
    ],
  },
  {
    id: "growth",
    name: "Pakej SME Berkembang",
    badge: "Pilihan Paling Popular",
    monthlyPrice: 499,
    annualPriceMonthly: 419,
    isPopular: true,
    targetProfile: "Kedai, Restoran, Bengkel, Servis & Sdn Bhd Kecil (< RM500k setahun)",
    transactionLimit: "Hingga 120 Transaksi / Bulan",
    features: [
      "Simpan Kira Bulanan Lengkap & Rekod Belian/Jualan",
      "Penyelarasan hingga 2 Akaun Bank & Tunai POS",
      "Laporan Penuh: Untung Rugi & Neraca Imbangan",
      "Pengurusan Gaji & Slip Gaji (hingga 5 staf)",
      "Urus Caruman KWSP, SOCSO, EIS & PCB",
      "Bantuan Asas Pelaksanaan e-Invois LHDN",
      "WhatsApp Group Khas Bersama Akauntan Anda",
    ],
    statutoryCoverage: [
      "Slip Gaji & Portal KWSP/SOCSO",
      "Bantuan e-Invois LHDN",
      "Penyata Kewangan Bank-Ready",
      "Sijil & Dokumen Cukai Siap",
    ],
  },
  {
    id: "corporate",
    name: "Pakej Sdn Bhd Pro",
    badge: "Semua Lengkap Termasuk Audit",
    monthlyPrice: 799,
    annualPriceMonthly: 699,
    targetProfile: "Sdn Bhd Aktif, Perdagangan atau Dalam Proses Mohon Loan Bank",
    transactionLimit: "Hingga 250 Transaksi / Bulan",
    features: [
      "Simpan Kira Penuh Setiap Bulan Tanpa Had Akaun Bank",
      "Pengurusan Gaji Penuh hingga 10 staf (Slip + Caruman)",
      "Bantuan Penuh e-Invois LHDN & Pematuhan SSM",
      "Pakej Laporan Kewangan Sedia Untuk Pinjaman Bank",
      "Penyediaan Dokumen Kerja Untuk Juruaudit & Setiausaha",
      "Penyelarasan Cukai Syarikat (CP204 & Pelepasan Maksimum)",
      "Akses Terus Kepada Rakan Kongsi Kanan (Senior Partner)",
    ],
    statutoryCoverage: [
      "Set Audit Working Paper Lengkap",
      "Borang E & Borang EA Semua Staf",
      "Bimbingan Kelulusan Pinjaman Bank",
      "Jaminan Sifar Penalti LHDN",
    ],
  },
];

export const SME_TESTIMONIALS = [
  {
    name: "Puan Sarah Binti Osman",
    role: "Pemilik Butik Fesyen Online",
    business: "Sarah Exclusive (Bangi)",
    quote: "Dulu saya bayar kerani akaun RM2,800 sebulan tapi kerja asyik tertangguh. Dengan RNF cuma bayar RM499 sebulan, semua resit dan slip gaji staf siap tepat waktu. Jimat beribu ringgit!",
    savings: "Jimat RM 2,300/bln",
  },
  {
    name: "En. Hafizul Rahman",
    role: "Pengasas & Pemilik Kafé",
    business: "Kopi Klasik (Shah Alam)",
    quote: "Sebelum ni resit hilang merata dalam beg plastik. Bila nak buat cukai kepala pusing. Sekarang hantar gambar resit je kat WhatsApp RNF, hujung bulan akaun siap kemas dan tenang.",
    savings: "Bebas Pening Kepala",
  },
  {
    name: "Mr. Kevin Tan",
    role: "Pengarah Urusan",
    business: "Apex Auto Care (Klang)",
    quote: "Alhamdulillah loan beli mesin bengkel RM90k lepas dengan Maybank sebab RNF sediakan penyata akaun yang tersusun cantik. Servis sangat pantas dan mesra SME!",
    savings: "Loan RM90k Lulus",
  },
];

export const COMPARISON_DATA = {
  inHouse: {
    title: "Gaji Staf Akaun Full-Time",
    monthlySalary: 2800,
    epfSocsoEis: 450,
    softwareLicenses: 150,
    officeEquipmentHr: 200,
    totalMonthly: 3600,
    annualCost: 43200,
    painPoints: [
      "Kos tinggi: Minimum RM3,600+ sebulan termasuk KWSP, SOCSO, cuti & bonus",
      "Risiko staf berhenti: Bila staf berhenti, akaun tergantung berbulan-bulan",
      "Perlu pantau & ajar: Bos kena semak sendiri sebab staf junior kurang mahir",
      "Kena beli software akaun & sediakan meja komputer sendiri",
    ],
  },
  rnfManaged: {
    title: "Pakej RNF Business Solutions",
    monthlyFeeRange: "Dari RM 299 – RM 499 / bulan",
    averageFee: 499,
    epfSocsoEis: 0,
    softwareLicenses: "Termasuk Percuma",
    officeEquipmentHr: 0,
    totalMonthly: 499,
    annualCost: 5988,
    benefits: [
      "Jimat hingga 70% kos: Tiada KWSP, SOCSO, cuti sakit atau elaun tambahan",
      "Sentiasa ada: Pasukan akauntan berpengalaman 15+ tahun sentiasa bersiap sedia",
      "Sangat mudah: Hantar gambar resit via WhatsApp je, kami siapkan selebihnya",
      "Lengkap cukai & e-Invois: Bebas denda LHDN & akaun sedia bila-bila nak mohon loan",
    ],
  },
};

// Legacy placeholders for backward compatibility
export const SERVICE_PILLARS = SME_SERVICES.map((s, idx) => ({
  id: s.id,
  number: `0${idx + 1}`,
  title: s.title,
  tagline: s.tagline,
  coreBenefit: s.desc,
  keyDeliverables: s.points,
  bestFor: "SME Malaysia (< RM500k hasil)",
  iconName: s.icon,
  accentColor: "blue",
}));

export const CASE_STUDIES = SME_TESTIMONIALS.map((t, idx) => ({
  id: `study-${idx}`,
  companyName: t.business,
  entityType: "SME / Perniagaan Tempatan",
  industry: "F&B" as const,
  headline: t.quote,
  keyMetrics: [
    { label: "Hasil", value: t.savings, detail: "Keputusan Terbukti" },
  ],
  challenge: "Resit bersepah dan kos staf akaun yang mahal.",
  rnfSolution: "Pakej perakaunan luar RNF serendah RM299 - RM499 sebulan.",
  impactQuote: t.quote,
  founderName: t.name,
  founderRole: t.role,
}));
