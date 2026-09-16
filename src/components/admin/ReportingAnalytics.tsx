import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  FileSpreadsheet, 
  CheckCircle2, 
  PieChart, 
  Award, 
  Printer, 
  ArrowUpRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useCms, AUTHORIZED_ADMIN_EMAIL } from '../../context/CmsContext';

export const ReportingAnalytics: React.FC = () => {
  const { leads, teamMembers } = useCms();

  // Metrics
  const totalLeads = leads.length;
  const wonLeads = leads.filter(l => l.status === 'menang');
  const consultationLeads = leads.filter(l => l.status === 'konsultasi');
  const activePipelineLeads = leads.filter(l => l.status !== 'tutup');

  const totalPipelineMonthly = activePipelineLeads.reduce((acc, curr) => acc + (curr.estimatedMonthlyValue || 0), 0);
  const wonMonthlyRevenue = wonLeads.reduce((acc, curr) => acc + (curr.estimatedMonthlyValue || 0), 0);
  const annualWonValue = wonMonthlyRevenue * 12;

  const conversionRate = totalLeads > 0 ? ((wonLeads.length / totalLeads) * 100).toFixed(1) : '0';

  // Category counts
  const accountingCount = leads.filter(l => l.serviceCategory === 'accounting').length;
  const payrollCount = leads.filter(l => l.serviceCategory === 'payroll').length;
  const comboCount = leads.filter(l => l.serviceCategory === 'combo').length;

  // Print report
  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header with Report Generator */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1 border border-emerald-200">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>Laporan Prestasi Inkuiri & Pipeline CRM</span>
          </div>
          <h3 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-slate-900">
            Analitik Data & Laporan Eksekutif RNF
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Penjejakan langsung penukaran inkuiri SME, nilai langganan bulanan, dan agihan tugas pasukan.
          </p>
        </div>

        <button
          onClick={handlePrintReport}
          className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Eksport Laporan PDF</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Inquiries */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Jumlah Inkuiri</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="font-['Outfit'] text-3xl font-extrabold text-slate-900">
            {totalLeads}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>{activePipelineLeads.length} inkuiri dalam pipeline aktif</span>
          </div>
        </div>

        {/* Monthly Pipeline Value */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Nilai Pipeline Bulanan</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-['Outfit'] text-3xl font-extrabold text-slate-900">
            RM {totalPipelineMonthly.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Potensi langganan bulanan berulang
          </div>
        </div>

        {/* Won MRR Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Klien Menang (MRR)</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-['Outfit'] text-3xl font-extrabold text-emerald-700">
            RM {wonMonthlyRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1">
            ≈ RM {annualWonValue.toLocaleString()} / tahun (ARR)
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Kadar Penukaran</span>
            <CheckCircle2 className="w-4 h-4 text-purple-600" />
          </div>
          <div className="font-['Outfit'] text-3xl font-extrabold text-slate-900">
            {conversionRate}%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            {wonLeads.length} pelanggan daripada {totalLeads} inkuiri
          </div>
        </div>
      </div>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Category Breakdown */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-['Outfit'] text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PieChart className="w-4 h-4 text-blue-600" />
            <span>Permintaan Mengikut Kategori Servis</span>
          </h4>

          <div className="space-y-3">
            {/* Accounting */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                  <span>Pakej Perakaunan (RM 600 - RM 1,200)</span>
                </span>
                <span>{accountingCount} ({totalLeads > 0 ? Math.round((accountingCount / totalLeads) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-600 rounded-full" 
                  style={{ width: `${totalLeads > 0 ? (accountingCount / totalLeads) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Payroll */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Servis Payroll Gaji Staf (RM 200 - RM 500)</span>
                </span>
                <span>{payrollCount} ({totalLeads > 0 ? Math.round((payrollCount / totalLeads) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full" 
                  style={{ width: `${totalLeads > 0 ? (payrollCount / totalLeads) * 100 : 0}%` }}
                ></div>
              </div>
            </div>

            {/* Combo */}
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-purple-600" />
                  <span>Pakej Kombo Akaun + Payroll</span>
                </span>
                <span>{comboCount} ({totalLeads > 0 ? Math.round((comboCount / totalLeads) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-purple-600 rounded-full" 
                  style={{ width: `${totalLeads > 0 ? (comboCount / totalLeads) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Nota: Volum lebih 1,100 data & staf &gt; 20 tertakluk kepada pelarasan khas.</span>
          </div>
        </div>

        {/* Officer Workload Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-['Outfit'] text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Agihan Beban Tugas Pegawai RNF</span>
          </h4>

          <div className="space-y-3">
            {teamMembers.map((member) => {
              const assignedCount = leads.filter(l => l.assignedTo === member.name).length;
              const assignedValue = leads
                .filter(l => l.assignedTo === member.name)
                .reduce((a, b) => a + (b.estimatedMonthlyValue || 0), 0);

              return (
                <div key={member.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <span>{member.name}</span>
                      {member.name.includes('Alif') && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-amber-100 text-amber-900">Ketua</span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500">{member.role}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-extrabold text-blue-700">
                      {assignedCount} Inkuiri
                    </div>
                    <div className="text-[10px] font-semibold text-slate-400">
                      RM {assignedValue.toLocaleString()}/bln
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
