import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Download, 
  Settings, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useCms, AUTHORIZED_ADMIN_EMAIL } from '../../context/CmsContext';

export const GoogleSheetsSyncHub: React.FC = () => {
  const { 
    googleSheetsConfig, 
    updateGoogleSheetsConfig, 
    syncToGoogleSheets, 
    copyLeadsForGoogleSheets, 
    exportLeadsToCsv,
    syncLogs,
    leads 
  } = useCms();

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Form for config
  const [sheetName, setSheetName] = useState(googleSheetsConfig.sheetName);
  const [webhookUrl, setWebhookUrl] = useState(googleSheetsConfig.webhookUrl || '');
  const [autoSync, setAutoSync] = useState(googleSheetsConfig.autoSync);

  const handleSyncNow = async () => {
    setIsSyncing(true);
    setSyncFeedback(null);
    try {
      const res = await syncToGoogleSheets();
      if (res.success) {
        setSyncFeedback({ type: 'success', message: res.message });
      } else {
        setSyncFeedback({ type: 'error', message: res.message });
      }
    } catch (e: any) {
      setSyncFeedback({ type: 'error', message: e?.message || 'Ralat sambungan ke Google Sheets.' });
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncFeedback(null), 5000);
    }
  };

  const handleCopyClipboard = async () => {
    const success = await copyLeadsForGoogleSheets();
    if (success) {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  const handleDownloadCsv = () => {
    const csvData = exportLeadsToCsv();
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RNF_CRM_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateGoogleSheetsConfig({
      sheetName,
      webhookUrl,
      autoSync,
    });
    setShowConfigModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Status and Quick Sync */}
      <div className="bg-gradient-to-r from-[#0d3b66] to-[#09263b] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Integrasi Google Sheets Aktif</span>
            </div>
            <h3 className="font-['Outfit'] text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Pusat Penyegerakan Google Sheets RNF
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Disambungkan secara rasmi ke akaun <strong className="text-amber-300">{AUTHORIZED_ADMIN_EMAIL}</strong>. Setiap inkuiri pelanggan, status CRM, dan pegawai ditugaskan boleh disegerakkan secara automatik ke spreadsheet master anda.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
              <span className="flex items-center gap-1">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sheet: <strong>{googleSheetsConfig.sheetName}</strong></span>
              </span>
              <span className="text-slate-500">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Segerak Terakhir: <strong>{googleSheetsConfig.lastSyncTimestamp ? new Date(googleSheetsConfig.lastSyncTimestamp).toLocaleString('ms-MY') : 'Belum Pernah'}</strong></span>
              </span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto shrink-0">
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer whitespace-nowrap ${
                isSyncing 
                  ? 'bg-emerald-700 text-white opacity-80 cursor-wait' 
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Menyegerakkan...' : 'Segerakkan Sekarang (Sync)'}</span>
            </button>

            <button
              onClick={handleCopyClipboard}
              className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap border border-white/20"
              title="Salin semua baris untuk ditampal (Ctrl+V) ke mana-mana Google Sheet"
            >
              <Copy className="w-4 h-4 text-amber-300" />
              <span>Salin TSV (Copy)</span>
            </button>

            <button
              onClick={() => setShowConfigModal(true)}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors cursor-pointer border border-white/20 flex items-center justify-center"
              title="Tetapan Google Sheets"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sync Toast Feedback */}
        {syncFeedback && (
          <div className={`mt-4 p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
            syncFeedback.type === 'success' ? 'bg-emerald-900/90 text-emerald-200 border border-emerald-700' : 'bg-red-900/90 text-red-200 border border-red-700'
          }`}>
            {syncFeedback.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
            <span>{syncFeedback.message}</span>
          </div>
        )}

        {copiedToast && (
          <div className="mt-4 p-3 rounded-xl text-xs font-bold bg-amber-950 text-amber-200 border border-amber-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Semua {leads.length} data inkuiri disalin ke papan klip! Anda boleh buka Google Sheets dan tekan <strong>Ctrl + V</strong> untuk tampal terus.</span>
          </div>
        )}
      </div>

      {/* Grid: Methods & Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Method 1: Instant Sheet Copy */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 font-black">
              <Copy className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">
              1-Click Paste ke Google Sheet
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Format TSV tab-separated yang direka khas untuk Google Sheets. Salin dan tampal (Ctrl+V) ke dalam sel A1 tanpa sebarang kekeliruan kolum.
            </p>
          </div>
          <button
            onClick={handleCopyClipboard}
            className="mt-5 w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Salin Data Format Sheet</span>
          </button>
        </div>

        {/* Method 2: CSV Export */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 font-black">
              <Download className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">
              Muat Turun Fail CSV
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Eksport fail `.csv` lengkap dengan pengekodan UTF-8. Sesuai untuk sandaran luar talian, Microsoft Excel, atau import ke sistem perakaunan lain.
            </p>
          </div>
          <button
            onClick={handleDownloadCsv}
            className="mt-5 w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Muat Turun Fail CSV</span>
          </button>
        </div>

        {/* Method 3: Webhook / API Sync */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4 font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">
              Google Apps Script Webhook
            </h4>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Sambungkan URL Webhook Google Apps Script atau Zapier/Make untuk menolak setiap inkuiri baharu secara langsung ke fail spreadsheet Google Drive anda.
            </p>
          </div>
          <button
            onClick={() => setShowConfigModal(true)}
            className="mt-5 w-full py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Konfigurasi Webhook</span>
          </button>
        </div>
      </div>

      {/* Sync Log Activity */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="font-bold text-xs sm:text-sm text-slate-900">
              Log Aktiviti Penyegerakan (Sync Logs)
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {syncLogs.length} rekod aktiviti direkodkan
          </span>
        </div>

        <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
          {syncLogs.map((log) => (
            <div key={log.id} className="p-3.5 flex items-start justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-800">{log.message}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {new Date(log.timestamp).toLocaleString('ms-MY')} • {log.type}
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                {log.recordCount} Rekod
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <h3 className="font-['Outfit'] text-xl font-extrabold text-slate-900 mb-1">
              Konfigurasi Google Sheets
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Tetapkan sambungan spreadsheet untuk akaun <strong>{AUTHORIZED_ADMIN_EMAIL}</strong>
            </p>

            <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Tab / Sheet Target</label>
                <input
                  type="text"
                  value={sheetName}
                  onChange={(e) => setSheetName(e.target.value)}
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Google Apps Script Webhook URL (Pilihan)</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full p-2.5 border border-slate-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500/20"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  Jika ada webhook, data dihantar automatik setiap kali ada inkuiri baharu.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="autoSyncCheck"
                  checked={autoSync}
                  onChange={(e) => setAutoSync(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="autoSyncCheck" className="font-semibold text-slate-700 cursor-pointer">
                  Automatik segerak (Auto-sync) apabila inkuiri baharu masuk
                </label>
              </div>

              <div className="pt-4 border-t border-slate-150 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 font-bold rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-xl"
                >
                  Simpan Konfigurasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
