import React, { useState } from 'react';
import { 
  TestimonialItem 
} from '../../types';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Save, 
  X, 
  CheckCircle2, 
  Building2, 
  DollarSign, 
  Quote,
  Sparkles
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export const TestimonialsManager: React.FC = () => {
  const { content, updateTestimonials } = useCms();
  const { testimonials } = content;

  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [business, setBusiness] = useState('');
  const [quote, setQuote] = useState('');
  const [savings, setSavings] = useState('');
  const [rating, setRating] = useState<number>(5);

  const showNotification = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleStartCreate = () => {
    setName('');
    setRole('Pengarah Urusan');
    setBusiness('');
    setQuote('');
    setSavings('Jimat RM 2,000 / bulan');
    setRating(5);
    setIsCreating(true);
    setEditingItem(null);
  };

  const handleStartEdit = (item: TestimonialItem) => {
    setEditingItem(item);
    setName(item.name);
    setRole(item.role);
    setBusiness(item.business);
    setQuote(item.quote);
    setSavings(item.savings || '');
    setRating(item.rating || 5);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !business.trim() || !quote.trim()) {
      alert('Sila lengkapkan nama, syarikat dan petikan testimoni.');
      return;
    }

    if (isCreating) {
      const newItem: TestimonialItem = {
        id: `testi-${Date.now()}`,
        name: name.trim(),
        role: role.trim(),
        business: business.trim(),
        quote: quote.trim(),
        savings: savings.trim(),
        rating,
        dateAdded: new Date().toISOString().split('T')[0],
      };
      updateTestimonials([newItem, ...testimonials]);
      showNotification('Testimoni baharu berjaya ditambah!');
      setIsCreating(false);
    } else if (editingItem) {
      const updated = testimonials.map(t => {
        if (t.id === editingItem.id) {
          return {
            ...t,
            name: name.trim(),
            role: role.trim(),
            business: business.trim(),
            quote: quote.trim(),
            savings: savings.trim(),
            rating,
          };
        }
        return t;
      });
      updateTestimonials(updated);
      showNotification('Testimoni berjaya dikemaskini!');
      setEditingItem(null);
    }
  };

  const handleDelete = (id: string, clientName: string) => {
    if (confirm(`Adakah anda pasti ingin memadamkan testimoni dari "${clientName}"?`)) {
      const updated = testimonials.filter(t => t.id !== id);
      updateTestimonials(updated);
      showNotification('Testimoni telah dipadamkan.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pengurusan Bukti Sosial SME</span>
          </div>
          <h3 className="font-['Outfit'] text-xl sm:text-2xl font-bold text-slate-900">
            Kemaskini Bahagian Testimoni Klien
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Sunting ulasan peniaga SME, angka penjimatan kos bulanan, dan maklumat syarikat yang dipaparkan di laman utama.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartCreate}
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Testimoni Baharu</span>
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>{toast}</span>
        </div>
      )}

      {/* Modal / Form when Creating or Editing */}
      {(isCreating || editingItem) && (
        <div className="bg-white rounded-2xl border-2 border-blue-500 p-6 shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-4">
            <div className="flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-600" />
              <h4 className="font-['Outfit'] font-bold text-base text-slate-900">
                {isCreating ? 'Tambah Testimoni Baharu' : `Kemaskini Testimoni: ${editingItem?.name}`}
              </h4>
            </div>
            <button
              onClick={() => {
                setIsCreating(false);
                setEditingItem(null);
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Penuh Klien *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: En. Azlan Kamaruddin"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Jawatan / Kedudukan
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Pengasas & CEO"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Syarikat / Bisnes *
                </label>
                <input
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="Contoh: Azlan Auto Parts Sdn Bhd"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Penjimatan Kos / Impak
                </label>
                <input
                  type="text"
                  value={savings}
                  onChange={(e) => setSavings(e.target.value)}
                  placeholder="Contoh: Jimat RM 2,800/bln"
                  className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Petikan Ulasan (Quote Testimoni) *
              </label>
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                rows={3}
                placeholder="Tulis maklum balas dan pengalaman klien menggunakan servis perakaunan / payroll RNF..."
                className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Penarafan (Bintang):</span>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          star <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-blue-700 hover:bg-blue-800 text-white rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Testimoni</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id || t.name}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col justify-between hover:border-slate-300 transition-colors"
          >
            <div>
              {/* Card Header: Rating & Savings Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(t.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                {t.savings && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {t.savings}
                  </span>
                )}
              </div>

              {/* Quote */}
              <div className="relative mb-4">
                <Quote className="w-5 h-5 text-blue-100 absolute -top-1 -left-1" />
                <p className="text-xs text-slate-700 italic leading-relaxed pl-4">
                  "{t.quote}"
                </p>
              </div>

              {/* Author & Business */}
              <div className="pt-3 border-t border-slate-100">
                <div className="font-bold text-xs text-slate-900">{t.name}</div>
                <div className="text-[11px] text-blue-700 font-semibold">{t.role}</div>
                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3 text-slate-400" />
                  <span>{t.business}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleStartEdit(t)}
                className="px-2.5 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-50 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Sunting</span>
              </button>

              <button
                type="button"
                onClick={() => handleDelete(t.id || t.name, t.name)}
                className="px-2.5 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Padam</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
