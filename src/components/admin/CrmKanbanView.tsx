import React, { useState } from 'react';
import { 
  InquiryLead, 
  InquiryStatus, 
  TeamMember 
} from '../../types';
import { 
  UserCheck, 
  Clock, 
  Phone, 
  Mail, 
  Building2, 
  FileSpreadsheet, 
  Users, 
  MessageCircle, 
  Tag, 
  ChevronRight, 
  Plus, 
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';

interface CrmKanbanViewProps {
  leads: InquiryLead[];
  teamMembers: TeamMember[];
  onUpdateStatus: (id: string, status: InquiryStatus) => void;
  onAssignLead: (id: string, memberName: string) => void;
  onAddNote: (id: string, note: string) => void;
  onDeleteLead: (id: string) => void;
}

const COLUMNS: { id: InquiryStatus; label: string; color: string; badgeColor: string }[] = [
  { id: 'baru', label: 'Baru Masuk', color: 'border-amber-400 bg-amber-50/50', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
  { id: 'dihubungi', label: 'Telah Dihubungi', color: 'border-blue-400 bg-blue-50/50', badgeColor: 'bg-blue-100 text-blue-900 border-blue-300' },
  { id: 'konsultasi', label: 'Sesi Konsultasi', color: 'border-purple-400 bg-purple-50/50', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300' },
  { id: 'menang', label: 'Pelanggan Menang', color: 'border-emerald-400 bg-emerald-50/50', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
  { id: 'tutup', label: 'Ditutup / Arkib', color: 'border-slate-300 bg-slate-50/50', badgeColor: 'bg-slate-200 text-slate-700 border-slate-300' },
];

export const CrmKanbanView: React.FC<CrmKanbanViewProps> = ({
  leads,
  teamMembers,
  onUpdateStatus,
  onAssignLead,
  onAddNote,
  onDeleteLead,
}) => {
  const [selectedLeadForNote, setSelectedLeadForNote] = useState<string | null>(null);
  const [noteInput, setNoteInput] = useState('');

  const handleOpenWhatsApp = (lead: InquiryLead) => {
    const cleanPhone = lead.phone.replace(/[\s-+]/g, '');
    const text = encodeURIComponent(
      `Salam En/Puan ${lead.fullName} (${lead.companyName}), saya dari RNF Business Solutions berhubung inkuiri pakej ${lead.selectedPackage} syarikat anda. Boleh kita bincang jadual sesi konsultasi percuma?`
    );
    window.open(`https://wa.me/${cleanPhone.startsWith('6') ? cleanPhone : '6' + cleanPhone}?text=${text}`, '_blank');
  };

  const handleSaveNote = (leadId: string) => {
    if (!noteInput.trim()) return;
    onAddNote(leadId, noteInput.trim());
    setNoteInput('');
    setSelectedLeadForNote(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
      {COLUMNS.map((column) => {
        const columnLeads = leads.filter((lead) => lead.status === column.id);
        const columnTotalValue = columnLeads.reduce((acc, curr) => acc + (curr.estimatedMonthlyValue || 0), 0);

        return (
          <div
            key={column.id}
            className={`rounded-2xl border-2 ${column.color} p-3 sm:p-4 flex flex-col min-h-[500px] shadow-sm`}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 mb-3">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-slate-800">
                  {column.label}
                </span>
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-full border ${column.badgeColor}`}>
                  {columnLeads.length}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-500">
                RM {columnTotalValue.toLocaleString()}/bln
              </span>
            </div>

            {/* Leads Cards */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[750px] pr-0.5">
              {columnLeads.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs italic">
                  Tiada inkuiri dalam lajur ini
                </div>
              ) : (
                columnLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative group"
                  >
                    {/* Top Row: Service & Value */}
                    <div className="flex items-center justify-between gap-1.5 mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200 truncate max-w-[120px]">
                        {lead.selectedPackage}
                      </span>
                      <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 shrink-0">
                        RM {lead.estimatedMonthlyValue}/bln
                      </span>
                    </div>

                    {/* Company & Client Name */}
                    <h4 className="font-bold text-sm text-slate-900 leading-snug">
                      {lead.companyName}
                    </h4>
                    <div className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                      <span className="font-medium text-slate-700">{lead.fullName}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-[11px] text-slate-500">{lead.entityType}</span>
                    </div>

                    {/* Data / Staff range highlight */}
                    <div className="mt-2 text-[11px] font-medium text-slate-600 bg-slate-50 px-2 py-1 rounded border border-slate-150 flex items-center gap-1.5">
                      {lead.serviceCategory === 'payroll' ? (
                        <Users className="w-3 h-3 text-emerald-600 shrink-0" />
                      ) : (
                        <FileSpreadsheet className="w-3 h-3 text-blue-600 shrink-0" />
                      )}
                      <span className="truncate">{lead.dataVolumeOrStaffCount}</span>
                    </div>

                    {/* Contact Info Fast Buttons */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                      <button
                        onClick={() => handleOpenWhatsApp(lead)}
                        className="flex-1 py-1 px-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        title="Buka WhatsApp"
                      >
                        <MessageCircle className="w-3 h-3 text-emerald-600" />
                        <span>WhatsApp</span>
                      </button>

                      <a
                        href={`tel:${lead.phone.replace(/[\s-+]/g, '')}`}
                        className="py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded flex items-center justify-center gap-1 transition-colors"
                        title="Panggil Klien"
                      >
                        <Phone className="w-3 h-3 text-slate-600" />
                      </a>

                      <a
                        href={`mailto:${lead.email}`}
                        className="py-1 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded flex items-center justify-center gap-1 transition-colors"
                        title="Hantar Emel"
                      >
                        <Mail className="w-3 h-3 text-slate-600" />
                      </a>
                    </div>

                    {/* Assigned Officer Dropdown */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <UserCheck className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>Pegawai:</span>
                      </div>
                      <select
                        value={lead.assignedTo}
                        onChange={(e) => onAssignLead(lead.id, e.target.value)}
                        className="text-[11px] font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 cursor-pointer max-w-[130px] truncate"
                      >
                        {teamMembers.map((m) => (
                          <option key={m.id} value={m.name}>
                            {m.name.split(' ')[0]} ({m.role.split(' ')[0]})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status Mover Quick Buttons */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px]">
                      <span className="text-slate-400 font-semibold">Tukar Fasa:</span>
                      <div className="flex items-center gap-1">
                        {COLUMNS.filter(c => c.id !== lead.status).map(c => (
                          <button
                            key={c.id}
                            onClick={() => onUpdateStatus(lead.id, c.id)}
                            className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 font-bold transition-colors cursor-pointer"
                            title={`Pindah ke ${c.label}`}
                          >
                            {c.label.slice(0, 4)}..
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes Preview & Quick Add */}
                    <div className="mt-2 pt-1.5 border-t border-slate-100">
                      {lead.notes && lead.notes.length > 0 && (
                        <div className="text-[10px] text-slate-500 italic bg-amber-50/70 p-1.5 rounded border border-amber-200/50 mb-1.5 line-clamp-2">
                          "{lead.notes[0]}"
                        </div>
                      )}

                      {selectedLeadForNote === lead.id ? (
                        <div className="mt-1 space-y-1">
                          <input
                            type="text"
                            value={noteInput}
                            onChange={(e) => setNoteInput(e.target.value)}
                            placeholder="Catat nota aktiviti..."
                            className="w-full text-xs p-1.5 border border-blue-400 rounded focus:outline-none"
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleSaveNote(lead.id);
                            }}
                          />
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => setSelectedLeadForNote(null)}
                              className="text-[10px] px-2 py-0.5 text-slate-500"
                            >
                              Batal
                            </button>
                            <button
                              onClick={() => handleSaveNote(lead.id)}
                              className="text-[10px] px-2 py-0.5 bg-blue-600 text-white font-bold rounded"
                            >
                              Simpan
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setSelectedLeadForNote(lead.id);
                            setNoteInput('');
                          }}
                          className="text-[10px] font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                        >
                          <Plus className="w-2.5 h-2.5" />
                          <span>Tambah Nota</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
