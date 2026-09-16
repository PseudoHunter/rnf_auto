import React, { useState } from 'react';
import { InquiryLead, InquiryStatus, TeamMember } from '../../types';
import { 
  Search, 
  Filter, 
  MessageCircle, 
  Phone, 
  Mail, 
  Trash2, 
  Calendar, 
  CheckCircle2, 
  ExternalLink,
  Users,
  FileSpreadsheet
} from 'lucide-react';

interface CrmListViewProps {
  leads: InquiryLead[];
  teamMembers: TeamMember[];
  onUpdateStatus: (id: string, status: InquiryStatus) => void;
  onAssignLead: (id: string, memberName: string) => void;
  onDeleteLead: (id: string) => void;
}

export const CrmListView: React.FC<CrmListViewProps> = ({
  leads,
  teamMembers,
  onUpdateStatus,
  onAssignLead,
  onDeleteLead,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || lead.serviceCategory === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleOpenWhatsApp = (lead: InquiryLead) => {
    const cleanPhone = lead.phone.replace(/[\s-+]/g, '');
    const text = encodeURIComponent(
      `Salam En/Puan ${lead.fullName} (${lead.companyName}), saya dari RNF Business Solutions berhubung inkuiri ${lead.selectedPackage} syarikat anda. Boleh kita bincang jadual sesi konsultasi percuma?`
    );
    window.open(`https://wa.me/${cleanPhone.startsWith('6') ? cleanPhone : '6' + cleanPhone}?text=${text}`, '_blank');
  };

  const getStatusBadge = (status: InquiryStatus) => {
    switch (status) {
      case 'baru':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300">Baru Masuk</span>;
      case 'dihubungi':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-900 border border-blue-300">Telah Dihubungi</span>;
      case 'konsultasi':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-100 text-purple-900 border border-purple-300">Sesi Konsultasi</span>;
      case 'menang':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">Pelanggan Menang</span>;
      case 'tutup':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-700 border border-slate-300">Ditutup</span>;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Filters & Search Toolbar */}
      <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 bg-slate-50/70">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari syarikat, nama klien, telefon..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-1.5 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-xs font-semibold text-slate-600">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white font-medium cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="baru">Baru Masuk</option>
              <option value="dihubungi">Telah Dihubungi</option>
              <option value="konsultasi">Konsultasi</option>
              <option value="menang">Menang</option>
              <option value="tutup">Ditutup</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-semibold text-slate-600">Kategori:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 bg-white font-medium cursor-pointer"
            >
              <option value="all">Semua Servis</option>
              <option value="accounting">Perakaunan</option>
              <option value="payroll">Payroll</option>
              <option value="combo">Kombo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Klien & Syarikat</th>
              <th className="py-3 px-4">Pakej Dipilih</th>
              <th className="py-3 px-4">Volum / Staf</th>
              <th className="py-3 px-4">Nilai Anggaran</th>
              <th className="py-3 px-4">Status CRM</th>
              <th className="py-3 px-4">Ditugaskan Kepada</th>
              <th className="py-3 px-4">Tindakan Pantas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-400">
                  Tiada rekod inkuiri sepadan dengan carian anda.
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Client & Company */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{lead.companyName}</div>
                    <div className="text-[11px] text-slate-500">
                      {lead.fullName} • <span className="text-slate-400">{lead.entityType}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(lead.createdAt).toLocaleDateString('ms-MY')}</span>
                    </div>
                  </td>

                  {/* Selected Package */}
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-800 block">
                      {lead.selectedPackage}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-blue-600">
                      {lead.serviceCategory}
                    </span>
                  </td>

                  {/* Volume / Staff Range */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-slate-700 bg-slate-100 px-2 py-1 rounded inline-block">
                      {lead.dataVolumeOrStaffCount}
                    </div>
                  </td>

                  {/* Estimated Monthly Value */}
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-emerald-700">
                      RM {lead.estimatedMonthlyValue}/bln
                    </div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1 items-start">
                      {getStatusBadge(lead.status)}
                      <select
                        value={lead.status}
                        onChange={(e) => onUpdateStatus(lead.id, e.target.value as InquiryStatus)}
                        className="text-[10px] border border-slate-200 rounded px-1.5 py-0.5 bg-white cursor-pointer font-medium"
                      >
                        <option value="baru">Baru Masuk</option>
                        <option value="dihubungi">Telah Dihubungi</option>
                        <option value="konsultasi">Sesi Konsultasi</option>
                        <option value="menang">Menang (Client)</option>
                        <option value="tutup">Ditutup</option>
                      </select>
                    </div>
                  </td>

                  {/* Assigned Officer Dropdown */}
                  <td className="py-3.5 px-4">
                    <select
                      value={lead.assignedTo}
                      onChange={(e) => onAssignLead(lead.id, e.target.value)}
                      className="text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded px-2 py-1 cursor-pointer max-w-[150px]"
                    >
                      {teamMembers.map((m) => (
                        <option key={m.id} value={m.name}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  </td>

                  {/* Quick Action Buttons */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenWhatsApp(lead)}
                        className="p-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors cursor-pointer"
                        title="Buka WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <a
                        href={`tel:${lead.phone.replace(/[\s-+]/g, '')}`}
                        className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                        title="Panggil Telefon"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => {
                          if (confirm(`Padamkan inkuiri daripada ${lead.companyName}?`)) {
                            onDeleteLead(lead.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Padam Inkuiri"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Count */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
        <span>Memaparkan {filteredLeads.length} daripada {leads.length} inkuiri</span>
        <span className="font-semibold text-slate-700">
          Jumlah Nilai Pipeline: RM {filteredLeads.reduce((a, b) => a + (b.estimatedMonthlyValue || 0), 0).toLocaleString()} / bulan
        </span>
      </div>
    </div>
  );
};
