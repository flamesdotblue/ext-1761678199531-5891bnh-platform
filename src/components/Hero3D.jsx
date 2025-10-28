import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

export default function Hero3D() {
  return (
    <div className="relative w-full h-[80vh] md:h-[86vh] overflow-hidden rounded-none">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/MscgRj2doJR2RRa2/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-slate-200">
            24/7 Cooling Experts
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight tracking-tight">
            Premium AC, Refrigeration, Cold Rooms & Dispenser Service
          </h1>
          <p className="mt-4 text-slate-200/90 md:text-lg">
            Sales, installation, and repairs with certified technicians and rapid response. Keep your business and home perfectly chilled.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-medium transition">
              Get a Quote <ArrowRight size={18} />
            </a>
            <a href="#services" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium transition">
              Explore Services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
