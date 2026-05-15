import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Cpu, 
  Database, 
  Layers, 
  Smartphone, 
  ShieldCheck, 
  ArrowRight,
  Code2,
  Zap,
  Server
} from 'lucide-react';

interface VisualModuleProps {
  onNext?: () => void;
  onPrev?: () => void;
  onBack?: () => void;
}

const ModuleFundamental: React.FC<VisualModuleProps> = ({ onNext, onPrev, onBack }) => {
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
            <span>Modul 1.0</span>
            <span className="w-10 h-px bg-current" />
            <span className="text-blue-500">The Blueprint</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tightest leading-none">
            Web Development <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Fundamental Hub.
            </span>
          </h1>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
            Memahami fondasi teknologi web modern sebelum menulis baris kode pertama. 
            Arsitektur, model data, dan ekosistem digital 2026.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Section 1: The 3 Pillars Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="col-span-12 md:col-span-8 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden group"
        >
          <div className="relative z-10">
            <h2 className="text-2xl font-bold italic mb-12 flex items-center gap-3">
              <Layers className="text-blue-500" /> Tiga Pilar Utama
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="flex flex-col items-center gap-6 group/item">
                  <div className="w-24 h-24 rounded-3xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover/item:rotate-12 transition-transform shadow-lg shadow-orange-500/5">
                    <Code2 size={40} />
                  </div>
                  <div className="text-center">
                    <p className="font-black text-xl">HTML</p>
                    <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Struktur / Rangka</p>
                  </div>
               </div>

               <div className="w-12 h-px bg-black/10 dark:bg-white/10 hidden md:block" />

               <div className="flex flex-col items-center gap-6 group/item">
                  <div className="w-24 h-24 rounded-3xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover/item:-rotate-12 transition-transform shadow-lg shadow-blue-500/5">
                    <Smartphone size={40} />
                  </div>
                  <div className="text-center">
                    <p className="font-black text-xl">CSS</p>
                    <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Gaya / Visual</p>
                  </div>
               </div>

               <div className="w-12 h-px bg-black/10 dark:bg-white/10 hidden md:block" />

               <div className="flex flex-col items-center gap-6 group/item">
                  <div className="w-24 h-24 rounded-3xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 group-hover/item:scale-110 transition-transform shadow-lg shadow-yellow-500/5">
                    <Zap size={40} />
                  </div>
                  <div className="text-center">
                    <p className="font-black text-xl">JS</p>
                    <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Logika / Otot</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
        </motion.div>

        {/* Section 2: Client-Server Flow */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="col-span-12 md:col-span-4 bg-black text-white dark:bg-white dark:text-black p-10 rounded-[3rem] shadow-2xl relative overflow-hidden"
        >
          <h2 className="text-xl font-bold italic mb-8">Client-Server Alur</h2>
          <div className="space-y-12 relative">
             <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center">
                   <Smartphone size={18} />
                </div>
                <div className="flex-1 h-px bg-white/20 dark:bg-black/20" />
                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-40">Request</span>
             </div>

             <div className="flex items-center gap-4 relative z-10 pl-12">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                   <Globe size={18} />
                </div>
                <div className="flex-1 h-px bg-white/20 dark:bg-black/20" />
                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-40">Process</span>
             </div>

             <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center">
                   <Database size={18} />
                </div>
                <div className="flex-1 h-px bg-white/20 dark:bg-black/20" />
                <span className="text-[10px] font-bold uppercase tracking-tighter opacity-40">Data</span>
             </div>
             
             {/* Connection Line */}
             <div className="absolute top-4 left-5 bottom-4 w-px bg-gradient-to-b from-transparent via-white/20 dark:via-black/20 to-transparent" />
          </div>
          <p className="mt-12 text-xs opacity-50 leading-relaxed italic">
            "Request dikirim dari browser, diproses di server Cloudflare, dan data diambil dari D1 Database."
          </p>
        </motion.div>

        {/* Section 3: Bento Grid Core Concepts */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-8">
           <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                <Cpu size={24} />
              </div>
              <h4 className="font-black text-xl italic">Frontend</h4>
              <p className="text-sm opacity-50 leading-relaxed">Wajah website. Apa yang Anda lihat dan interaksikan di browser.</p>
           </motion.div>

           <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                <Server size={24} />
              </div>
              <h4 className="font-black text-xl italic">Backend</h4>
              <p className="text-sm opacity-50 leading-relaxed">Mesin website. Menangani logika, keamanan, dan pengolahan data.</p>
           </motion.div>

           <motion.div whileHover={{ scale: 1.02 }} className="p-8 rounded-[2.5rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4 shadow-sm hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-black text-xl italic">Security</h4>
              <p className="text-sm opacity-50 leading-relaxed">HTTPS, enkripsi, dan protokol yang menjaga data tetap aman.</p>
           </motion.div>
        </div>

        {/* Section 4: Modern Infrastructure 2026 */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="col-span-12 bg-gradient-to-r from-blue-600 to-indigo-700 p-12 md:p-20 rounded-[4rem] text-white overflow-hidden relative shadow-2xl"
        >
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div className="space-y-8">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter">Infrastructure <br/> as Code.</h2>
                <p className="text-white/70 text-lg leading-relaxed">
                  Di tahun 2026, kita tidak lagi menyewa server fisik. Kita menggunakan **Edge Computing** yang tersebar di ratusan kota di seluruh dunia.
                </p>
                <div className="flex gap-4">
                  <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl font-bold text-xs uppercase tracking-widest border border-white/20">Cloudflare Pages</div>
                  <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-2xl font-bold text-xs uppercase tracking-widest border border-white/20">D1 Database</div>
                </div>
             </div>
             
             <div className="grid grid-cols-2 gap-6">
                <div className="bg-white/10 p-8 rounded-[2rem] border border-white/20 backdrop-blur-md">
                   <p className="text-3xl font-black mb-2">0.2s</p>
                   <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Global Latency</p>
                </div>
                <div className="bg-white/10 p-8 rounded-[2rem] border border-white/20 backdrop-blur-md">
                   <p className="text-3xl font-black mb-2">99.9%</p>
                   <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Uptime Rate</p>
                </div>
                <div className="col-span-2 bg-white text-blue-700 p-8 rounded-[2rem] flex items-center justify-between">
                   <div>
                      <p className="font-black text-xl">Auto-Scaling</p>
                      <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Ready for 1M+ Users</p>
                   </div>
                   <Zap fill="currentColor" />
                </div>
             </div>
          </div>
          <div className="absolute top-0 right-0 w-[50%] h-full bg-white/5 skew-x-[-20deg] pointer-events-none" />
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
            Start Coding <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleFundamental;
