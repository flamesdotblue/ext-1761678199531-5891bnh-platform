import { useState } from 'react';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: 'Air Conditioning', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });

  const saveLead = (lead) => {
    try {
      const existing = JSON.parse(localStorage.getItem('leads') || '[]');
      const withId = { id: crypto.randomUUID(), date: new Date().toISOString(), ...lead };
      const updated = [withId, ...existing];
      localStorage.setItem('leads', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save lead', e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus({ type: 'error', msg: 'Name and phone are required.' });
      return;
    }
    saveLead(form);
    setStatus({ type: 'success', msg: 'Thanks! We will contact you shortly.' });
    setForm({ name: '', phone: '', email: '', service: 'Air Conditioning', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="relative rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md bg-slate-950/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Phone</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-md bg-slate-950/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="e.g., +1 555 123 4567"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-md bg-slate-950/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Service</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full rounded-md bg-slate-950/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option>Air Conditioning</option>
            <option>Commercial Refrigeration</option>
            <option>Beverage Dispensers</option>
            <option>Cold Rooms & Service</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm text-slate-300 mb-1">Message</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full min-h-[120px] rounded-md bg-slate-950/60 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Describe your request (issue, model, site address, time)"
          />
        </div>
      </div>
      {status.msg && (
        <div className={`mt-4 text-sm ${status.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>{status.msg}</div>
      )}
      <div className="mt-6 flex items-center gap-3">
        <button type="submit" className="inline-flex items-center justify-center px-5 py-2.5 rounded-md bg-sky-500 hover:bg-sky-600 transition font-medium">
          Send Request
        </button>
        <span className="text-xs text-slate-400">We respect your privacy. No spam.</span>
      </div>
    </form>
  );
}
