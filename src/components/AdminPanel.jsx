import { useEffect, useMemo, useState } from 'react';
import { X, Trash2, Lock, ShieldCheck } from 'lucide-react';

const OWNER_KEY = 'OWNER-1234';

export default function AdminPanel({ open, onOpenChange, onAuthChange }) {
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState('');
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('owner_authed') === 'true';
    setAuthed(stored);
  }, [open]);

  useEffect(() => {
    if (open && authed) {
      try {
        const l = JSON.parse(localStorage.getItem('leads') || '[]');
        setLeads(l);
      } catch (e) {
        setLeads([]);
      }
    }
  }, [open, authed]);

  const sortedLeads = useMemo(() => {
    return [...leads].sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [leads]);

  const attemptAuth = (e) => {
    e.preventDefault();
    const ok = key.trim() === OWNER_KEY;
    setAuthed(ok);
    onAuthChange?.(ok);
    if (!ok) return;
    setKey('');
  };

  const clearLead = (id) => {
    const filtered = leads.filter((l) => l.id !== id);
    setLeads(filtered);
    localStorage.setItem('leads', JSON.stringify(filtered));
  };

  const clearAll = () => {
    setLeads([]);
    localStorage.setItem('leads', '[]');
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => onOpenChange(false)} />
      <div className="relative z-10 w-[95vw] max-w-3xl max-h-[85vh] overflow-hidden rounded-xl border border-white/10 bg-slate-950">
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div className="font-semibold">Owner Admin</div>
          <button className="p-2 hover:bg-white/5 rounded-md" onClick={() => onOpenChange(false)} aria-label="Close admin panel">
            <X size={18} />
          </button>
        </div>

        {!authed ? (
          <div className="p-6">
            <div className="flex items-center gap-2 text-slate-300">
              <Lock size={18} /> Owner access only
            </div>
            <form onSubmit={attemptAuth} className="mt-4 flex gap-2">
              <input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter owner key"
                className="flex-1 rounded-md bg-slate-900 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button className="px-4 py-2 rounded-md bg-sky-500 hover:bg-sky-600 font-medium">Unlock</button>
            </form>
            <p className="text-xs text-slate-500 mt-3">Hint for demo: OWNER-1234</p>
          </div>
        ) : (
          <div className="p-0">
            <div className="px-5 py-3 text-xs text-emerald-300 flex items-center gap-2 border-b border-white/10 bg-emerald-500/10">
              <ShieldCheck size={16} /> Authenticated
            </div>
            <div className="p-5 overflow-auto max-h-[60vh]">
              {sortedLeads.length === 0 ? (
                <p className="text-slate-400">No leads yet. Submissions from the website will appear here.</p>
              ) : (
                <div className="space-y-3">
                  {sortedLeads.map((lead) => (
                    <div key={lead.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{lead.name}
                          <span className="text-xs text-slate-400 ml-2">{new Date(lead.date).toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => clearLead(lead.id)}
                          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                      <div className="mt-1 text-sm text-slate-300">Service: {lead.service}</div>
                      <div className="mt-1 text-sm text-slate-300">Phone: {lead.phone}</div>
                      {lead.email && <div className="mt-1 text-sm text-slate-300">Email: {lead.email}</div>}
                      {lead.message && <div className="mt-2 text-sm text-slate-200 whitespace-pre-wrap">{lead.message}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-5 py-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-slate-400">Data is stored locally in this browser for demo purposes.</div>
              <button onClick={clearAll} className="text-xs px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10">Clear all</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
