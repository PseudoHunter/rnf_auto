import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Users, 
  Save, 
  CheckCircle2, 
  Info,
  DollarSign
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { AccountingPackage, PayrollPackage } from '../../types';

export const PackageEditor: React.FC = () => {
  const { content, updateAccountingPackages, updatePayrollPackages } = useCms();
  const [accPackages, setAccPackages] = useState<AccountingPackage[]>(content.accountingPackages);
  const [payPackages, setPayPackages] = useState<PayrollPackage[]>(content.payrollPackages);
  const [savedToast, setSavedToast] = useState(false);

  const handleAccChange = (index: number, field: keyof AccountingPackage, value: any) => {
    const updated = [...accPackages];
    updated[index] = { ...updated[index], [field]: value };
    setAccPackages(updated);
  };

  const handlePayChange = (index: number, field: keyof PayrollPackage, value: any) => {
    const updated = [...payPackages];
    updated[index] = { ...updated[index], [field]: value };
    setPayPackages(updated);
  };

  const handleSaveAll = () => {
    updateAccountingPackages(accPackages);
    updatePayrollPackages(payPackages);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-slate-900">
            Pengurusan Pakej Perakaunan & Payroll
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Kemaskini yuran bulanan rasmi dan julat volum data/staf yang dipaparkan kepada pelanggan.
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Perubahan Pakej</span>
        </button>
      </div>

      {savedToast && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Semua maklumat pakej perakaunan & payroll berjaya disimpan dan dikemaskini di laman utama!</span>
        </div>
      )}

      {/* Accounting Packages Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <FileSpreadsheet className="w-5 h-5 text-blue-600" />
          <h4 className="font-['Outfit'] font-bold text-base text-slate-900">
            1. Pakej Perakaunan (Accounting)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {accPackages.map((pkg, idx) => (
            <div key={pkg.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="font-black text-sm text-blue-950 uppercase">{pkg.tier}</div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Yuran Bulanan (RM)</label>
                <input
                  type="number"
                  value={pkg.monthlyPrice}
                  onChange={(e) => handleAccChange(idx, 'monthlyPrice', Number(e.target.value))}
                  className="w-full text-xs font-bold p-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Julat Volum Data</label>
                <input
                  type="text"
                  value={pkg.dataRange}
                  onChange={(e) => handleAccChange(idx, 'dataRange', e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg font-medium"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payroll Packages Table */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
          <Users className="w-5 h-5 text-emerald-600" />
          <h4 className="font-['Outfit'] font-bold text-base text-slate-900">
            2. Servis Payroll (Gaji Staf)
          </h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {payPackages.map((pkg, idx) => (
            <div key={pkg.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
              <div className="font-black text-sm text-emerald-950 uppercase">{pkg.tier}</div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Yuran Bulanan (RM)</label>
                <input
                  type="number"
                  value={pkg.monthlyPrice}
                  onChange={(e) => handlePayChange(idx, 'monthlyPrice', Number(e.target.value))}
                  className="w-full text-xs font-bold p-2 bg-white border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-0.5">Bilangan Staf</label>
                <input
                  type="text"
                  value={pkg.staffRange}
                  onChange={(e) => handlePayChange(idx, 'staffRange', e.target.value)}
                  className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg font-medium"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
