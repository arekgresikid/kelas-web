import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Zap, 
  Search, 
  Share2, 
  CheckCircle2, 
  ArrowRight,
  MousePointer2,
  Award
} from 'lucide-react';

interface VisualModuleProps {
  onNext?: () => void;
  onPrev?: () => void;
  onBack?: () => void;
}

const ModuleStrategy: React.FC<VisualModuleProps> = ({ onNext, onBack }) => {
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
            <span>Modul 11.5</span>
            <span className="w-10 h-px bg-current" />
            <span className="text-blue-500">Premium Visual Guide</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tightest leading-none">
            Strategi Promosi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Website Modern 2026.
            </span>
          </h1>
          <p className="text-lg text-black/60 dark:text-white/60 max-w-2xl leading-relaxed">
            Membangun ekosistem pemasaran digital yang terstruktur menggunakan bantuan AI dan data. 
            Pelajari bagaimana mengubah pengunjung menjadi pelanggan setia.
          </p>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
        
        {/* Section 1: Marketing Funnel Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="col-span-12 md:col-span-7 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[3rem] p-10 shadow-2xl relative overflow-hidden"
        >
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                <BarChart3 className="text-blue-500" />
              </div>
              <h2 className="text-2xl font-bold italic tracking-tight">The Marketing Funnel</h2>
            </div>

            <div className="space-y-4 relative">
              {[
                { label: 'Awareness', color: 'bg-blue-500', width: 'w-full', desc: 'Melihat Iklan/Konten' },
                { label: 'Interest', color: 'bg-indigo-500', width: 'w-11/12', desc: 'Mengunjungi Website' },
                { label: 'Consideration', color: 'bg-purple-500', width: 'w-10/12', desc: 'Membaca Review' },
                { label: 'Conversion', color: 'bg-pink-500', width: 'w-8/12', desc: 'Transaksi / Order' },
                { label: 'Loyalty', color: 'bg-rose-500', width: 'w-6/12', desc: 'Repeat Order' },
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative"
                >
                  <div className={`h-14 ${item.width} ${item.color} rounded-2xl flex items-center justify-between px-6 shadow-lg group-hover:scale-[1.02] transition-transform cursor-pointer`}>
                    <span className="font-bold text-white uppercase tracking-widest text-xs">{item.label}</span>
                    <span className="text-[10px] text-white/70 font-medium italic">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
        </motion.div>

        {/* Section 2: Quick Stats / Pillars */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="col-span-12 md:col-span-5 space-y-6"
        >
          <div className="bg-black text-white dark:bg-white dark:text-black p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
            <TrendingUp className="absolute top-6 right-6 opacity-20 group-hover:scale-150 transition-transform duration-700" size={80} />
            <h3 className="text-xl font-bold mb-4 italic">The 3 Pillars</h3>
            <ul className="space-y-4">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">1</div>
                <div>
                  <p className="font-bold text-sm">Performance</p>
                  <p className="text-xs opacity-60 leading-relaxed">Load under 2s is mandatory for conversion.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">2</div>
                <div>
                  <p className="font-bold text-sm">Mobile First</p>
                  <p className="text-xs opacity-60 leading-relaxed">80% of traffic comes from smartphones.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">3</div>
                <div>
                  <p className="font-bold text-sm">SEO Ready</p>
                  <p className="text-xs opacity-60 leading-relaxed">Meta tags & structure for Google discovery.</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-blue-500 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
            <Zap className="mb-4" />
            <h3 className="text-xl font-bold mb-2 tracking-tight">AI Integrated Marketing</h3>
            <p className="text-xs text-white/80 leading-relaxed mb-4">
              Leverage the power of Claude for copywriting and Midjourney for visual assets.
            </p>
            <div className="flex -space-x-2">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-blue-500 bg-white/20 overflow-hidden">
                   <img src={`https://ui-avatars.com/api/?name=AI+${i}`} alt="ai" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-blue-500 bg-white/20 flex items-center justify-center text-[8px] font-bold">
                +10
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 3: Organic vs Paid Bento */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4"
          >
            <Search className="text-blue-500" />
            <h4 className="font-bold">Organic Search</h4>
            <p className="text-xs opacity-60 leading-relaxed">Long-term value through high-quality content and SEO keywords.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4"
          >
            <Target className="text-purple-500" />
            <h4 className="font-bold">Paid Advertising</h4>
            <p className="text-xs opacity-60 leading-relaxed">Instant results using Meta Ads, Google Ads, and TikTok promotions.</p>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-8 rounded-[2rem] bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4"
          >
            <Share2 className="text-pink-500" />
            <h4 className="font-bold">Social Viral</h4>
            <p className="text-xs opacity-60 leading-relaxed">Building community and trust through educational social media content.</p>
          </motion.div>
        </div>

        {/* Section 4: AI & Future Tools */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="col-span-12 bg-gradient-to-br from-gray-900 to-black p-10 md:p-16 rounded-[4rem] text-white overflow-hidden relative"
        >
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-xl space-y-6">
              <h2 className="text-3xl md:text-5xl font-black italic">AI Pemasaran 2026</h2>
              <p className="text-white/60 leading-relaxed">
                Teknologi yang akan mengubah cara Anda berjualan. Dari asisten copywriting hingga analisis data otomatis yang memprediksi perilaku audiens.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Claude 3.5', 'Midjourney v7', 'Canva Magic', 'Vercel Analytics'].map(tag => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-widest">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="w-full md:w-auto flex flex-col gap-4">
               {[
                 { label: 'Copywriting AI', value: '95%', icon: <Award size={16} /> },
                 { label: 'Conversion Rate', value: '+40%', icon: <MousePointer2 size={16} /> },
                 { label: 'Efficiency', value: '3x Faster', icon: <Zap size={16} /> }
               ].map(stat => (
                 <div key={stat.label} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl flex items-center gap-6 min-w-[240px]">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-xl font-black">{stat.value}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="absolute bottom-0 right-0 w-[60%] h-[100%] bg-blue-500/20 rounded-full blur-[150px] pointer-events-none" />
        </motion.div>

        {/* Section 5: Step-by-Step Checklist */}
        <div className="col-span-12 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-[3rem] p-10 md:p-16">
          <div className="flex flex-col md:flex-row gap-16">
             <div className="md:w-1/3 space-y-4">
                <h2 className="text-3xl font-black italic leading-tight">Checklist <br/> Strategi.</h2>
                <p className="text-sm opacity-50 leading-relaxed">Ikuti langkah ini secara berurutan untuk mendapatkan hasil maksimal.</p>
                <div className="pt-8">
                  <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center font-black text-xl">
                    100%
                  </div>
                </div>
             </div>
             
             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  'Tentukan Target Audiens Spesifik',
                  'Rumuskan Unique Selling Point (USP)',
                  'Siapkan Landing Page yang Mengonversi',
                  'Pilih 1 Platform Promosi Utama',
                  'Gunakan AI untuk Konten Visual & Teks',
                  'Pasang Analytics & Pantau Data',
                  'Lakukan A/B Testing pada Iklan',
                  'Skalakan Kampanye yang Berhasil'
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-black/5 dark:bg-white/5 group hover:bg-blue-500 transition-colors">
                    <CheckCircle2 className="text-blue-500 group-hover:text-white" />
                    <span className="text-sm font-bold group-hover:text-white">{item}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>

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
            Complete Lesson <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModuleStrategy;
