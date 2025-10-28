import { Snowflake, Wrench, Droplets, Package } from 'lucide-react';

const services = [
  {
    icon: Snowflake,
    title: 'Air Conditioning',
    description: 'Split, central, and VRF systems. New installs, preventive maintenance, and repairs.'
  },
  {
    icon: Package,
    title: 'Commercial Refrigeration',
    description: 'Display fridges, freezers, ice machines. Energy-efficient models and rapid service.'
  },
  {
    icon: Droplets,
    title: 'Beverage Dispensers',
    description: 'Soda and water dispensers for cafes and events. Hygienic setup and calibration.'
  },
  {
    icon: Wrench,
    title: 'Cold Rooms & Service',
    description: 'Design, build, paneling, and temperature control with ongoing maintenance contracts.'
  }
];

export default function ServicesGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map(({ icon: Icon, title, description }) => (
        <div key={title} className="relative group rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition p-5">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-sky-500/15 border border-sky-400/20 text-sky-300">
              <Icon size={20} />
            </div>
            <h3 className="font-semibold">{title}</h3>
          </div>
          <p className="mt-3 text-sm text-slate-300">{description}</p>
          <div className="mt-4 text-xs text-slate-400">Sales • Installation • Repair</div>
        </div>
      ))}
    </div>
  );
}
