import React from 'react';
import { motion } from 'framer-motion';
import { 
  Server, 
  Cloud, 
  Globe, 
  Zap, 
  Shield, 
  Cpu,
  ArrowRight,
  Database,
  Network
} from 'lucide-react';

interface VisualModuleProps {
  onNext?: () => void;
  onPrev?: () => void;
  onBack?: () => void;
}

const ModuleInfrastructure: React.FC<VisualModuleProps> = ({ onNext, onPrev, onBack }) => {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#0d0d0d] text-black dark:text-white p-6 md:p-12 pb-32">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest opacity-40">
            <span>Modul 1.6</span>
            <span className="w-10 h-px bg-current" />
            <span className="text-blue-500">Global Edge</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tightest leading-none">
            Modern Web <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-500">
              Infrastructure 2026.
            </span>
          </h1>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
            Mengenal ekosistem Cloud dan Edge Computing yang membuat website berjalan secepat kilat dengan skalabilitas tanpa batas.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Section 1: Edge Computing Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="col-span-12 md:col-span-8 bg-black text-white p-10 md:p-16 rounded-[4rem] shadow-2xl relative overflow-hidden group"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-black italic mb-12 flex items-center gap-4">
              <Network className="text-blue-400" /> Edge Computing
            </h2>
            
            <div className="relative h-64 flex items-center justify-center">
               {/* Central Global Infra */}
               <div className="w-32 h-32 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center relative z-20">
                  <Globe className="text-blue-400 animate-pulse" size={48} />
               </div>
               
               {/* Edge Nodes */}
               {[
                 { pos: 'top-0 left-1/4', label: 'Jakarta' },
                 { pos: 'top-1/4 right-0', label: 'London' },
                 { pos: 'bottom-0 right-1/4', label: 'New York' },
                 { pos: 'bottom-1/4 left-0', label: 'Singapore' }
               ].map((node, i) => (
                 <motion.div 
                   key={i}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: i * 0.2 }}
                   className={`absolute ${node.pos} flex flex-col items-center gap-2`}
                 >
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                       <Server size={20} className="text-white/80" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-40">{node.label}</span>
                    {/* Connection Line to Center */}
                    <div className="absolute top-1/2 left-1/2 w-px h-32 bg-gradient-to-t from-blue-500/50 to-transparent -translate-x-1/2 -translate-y-1/2 rotate-[15deg] opacity-20 pointer-events-none" />
                 </motion.div>
               ))}
            </div>
            
            <p className="mt-12 text-sm text-white/50 max-w-lg italic">
              "Permintaan pengguna dilayani oleh server terdekat (Edge Node), bukan dikirim ke pusat data yang jauh. Ini memangkas waktu loading secara drastis."
            </p>
          </div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent opacity-50" />
        </motion.div>

        {/* Section 2: Hosting Comparison */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="col-span-12 md:col-span-4 space-y-6"
        >
          <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-8 rounded-[2.5rem] shadow-xl">
             <h3 className="text-xl font-bold mb-6 italic">Hosting Comparison</h3>
             <div className="space-y-6">
                <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-blue-500/30 transition-colors">
                   <p className="text-[10px] font-bold uppercase opacity-40 mb-1">Traditional</p>
                   <p className="font-bold">VPS / Shared Hosting</p>
                   <p className="text-xs opacity-50 mt-1">Lambat, sulit skalabilitas, biaya tetap.</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                   <p className="text-[10px] font-bold uppercase text-blue-500 mb-1">Modern 2026</p>
                   <p className="font-bold">Serverless / Edge</p>
                   <p className="text-xs opacity-50 mt-1">Instan, auto-scaling, bayar sesuai pemakaian.</p>
                </div>
             </div>
          </div>

          <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
             <Zap className="mb-4" />
             <h3 className="text-xl font-bold mb-2">Auto-Scaling</h3>
             <p className="text-xs text-white/80 leading-relaxed">
                Infrastruktur Anda akan membesar otomatis saat trafik melonjak, dan mengecil saat sepi. Hemat biaya & performa tetap terjaga.
             </p>
          </div>
        </motion.div>

        {/* Section 3: Tech Stack Grid */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-4 gap-6">
           {[
             { title: 'Cloudflare', desc: 'Edge Network & Security', icon: <Cloud className="text-orange-500" /> },
             { title: 'Vercel', desc: 'Deployment & Frontend Ops', icon: <Zap className="text-blue-500" /> },
             { title: 'D1 Database', desc: 'Global SQL Database', icon: <Database className="text-purple-500" /> },
             { title: 'SSL/TLS', desc: 'Encrypted Connections', icon: <Shield className="text-emerald-500" /> }
           ].map((tech, i) => (
             <motion.div 
               key={i}
               whileHover={{ y: -8 }}
               className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3"
             >
                <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
                   {tech.icon}
                </div>
                <h4 className="font-bold">{tech.title}</h4>
                <p className="text-[10px] opacity-50 leading-relaxed uppercase font-bold tracking-widest">{tech.desc}</p>
             </motion.div>
           ))}
        </div>

        {/* Section 4: Benefits Checklist */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="col-span-12 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[4rem] p-12 md:p-20"
        >
           <div className="flex flex-col md:flex-row gap-16 items-center">
              <div className="md:w-1/2 space-y-6">
                 <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none">Keuntungan <br/> Infrastruktur Modern.</h2>
                 <p className="text-lg opacity-50 leading-relaxed">
                    Bukan hanya tentang kecepatan, tapi tentang reliabilitas dan kemudahan pengelolaan bagi developer solo maupun tim besar.
                 </p>
              </div>
              
              <div className="flex-1 grid grid-cols-1 gap-4">
                 {[
                   'Latency Rendah (Website dimuat dari lokasi terdekat)',
                   'Auto-Healing (Sistem pulih otomatis jika terjadi kegagalan)',
                   'Keamanan Terintegrasi (DDoS Protection & WAF)',
                   'Zero Configuration Deployment (Fokus pada kode, bukan server)',
                   'Global Availability secara Default'
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-blue-500/20 transition-all group">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-xs">
                        {i + 1}
                      </div>
                      <span className="font-bold text-sm opacity-80 group-hover:opacity-100 transition-opacity">{item}</span>
                   </div>
                 ))}
              </div>
           </div>
        </motion.div>

      </div>

      <div className="fixed bottom-0 left-0 w-full p-8 flex justify-center z-[100]">
        <div className="bg-black/90 dark:bg-white/90 backdrop-blur-xl px-8 py-4 rounded-full flex items-center gap-12 shadow-2xl">
          <button onClick={onBack} className="text-white dark:text-black flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">
            Back to Modules
          </button>
          <div className="h-4 w-px bg-white/20 dark:bg-black/20" />
          <button 
            onClick={onNext}
            className="text-white dark:text-black flex items-center gap-2 text-xs font-bold uppercase tracking-widest group disabled:opacity-30"
            disabled={!onNext}
          >
            Check Security <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleInfrastructure;
