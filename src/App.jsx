import { useState, useEffect } from 'react';
import { Shield, LogOut } from 'lucide-react';
import Hero3D from './components/Hero3D';
import ServicesGrid from './components/ServicesGrid';
import ContactForm from './components/ContactForm';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [isOwnerAuthed, setIsOwnerAuthed] = useState(false);

  useEffect(() => {
    const authed = localStorage.getItem('owner_authed') === 'true';
    setIsOwnerAuthed(authed);
  }, []);

  const handleOwnerAuth = (val) => {
    setIsOwnerAuthed(val);
    localStorage.setItem('owner_authed', val ? 'true' : 'false');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="fixed top-0 left-0 right-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-slate-950/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight text-white">FrostFix Cooling Co.</a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-200">
            <a className="hover:text-white transition" href="#services">Services</a>
            <a className="hover:text-white transition" href="#contact">Contact</a>
          </nav>
          <button
            onClick={() => setAdminOpen(true)}
            className="inline-flex items-center gap-2 text-xs md:text-sm px-3 py-2 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 transition"
            aria-label="Open owner admin panel"
          >
            <Shield size={16} />
            {isOwnerAuthed ? 'Owner Panel' : 'Owner Login'}
          </button>
        </div>
      </header>

      <main className="pt-16">
        <section id="home" className="relative min-h-[90vh] flex items-center">
          <Hero3D />
        </section>

        <section id="services" className="relative py-24 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="max-w-3xl mb-10">
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Cooling Solutions for Every Need</h2>
              <p className="text-slate-300 mt-3">We sell, install, and repair AC units, commercial refrigeration, cold rooms, and beverage dispensers. Fast response, genuine parts, and certified technicians.</p>
            </div>
            <ServicesGrid />
          </div>
        </section>

        <section id="contact" className="relative py-24 bg-slate-900">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(30,64,175,0.25),transparent_60%)]" />
          <div className="relative max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="text-3xl font-semibold tracking-tight">Request a Quote or Repair</h3>
                <p className="text-slate-300 mt-3">Tell us what you need—our team will reach out within 1 business hour.</p>
                <ul className="mt-6 space-y-2 text-slate-300 text-sm">
                  <li>• Warranty-backed service</li>
                  <li>• Emergency response available</li>
                  <li>• Corporate and residential plans</li>
                </ul>
                {isOwnerAuthed && (
                  <button
                    onClick={() => {
                      localStorage.removeItem('owner_authed');
                      setIsOwnerAuthed(false);
                    }}
                    className="mt-6 inline-flex items-center gap-2 text-xs md:text-sm px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10"
                  >
                    <LogOut size={16} /> Sign out owner
                  </button>
                )}
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 py-10 text-sm text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} FrostFix Cooling Co. All rights reserved.</p>
          <p>AC • Refrigeration • Cold Rooms • Dispensers</p>
        </div>
      </footer>

      <AdminPanel open={adminOpen} onOpenChange={setAdminOpen} onAuthChange={handleOwnerAuth} />
    </div>
  );
}
