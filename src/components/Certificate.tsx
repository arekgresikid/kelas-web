import React, { useRef } from 'react';
import { Award, Download, Share2, ShieldCheck } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Certificate: React.FC = () => {
  const { user } = useAuth();
  const certRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto my-20 px-4">
      <div className="bg-black/5 dark:bg-white/5 border border-black dark:border-white rounded-3xl p-8 md:p-12 text-center space-y-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black dark:bg-white text-white dark:text-black mb-4">
          <Award size={40} />
        </div>
        
        <h2 className="text-4xl font-extrabold text-black dark:text-white tracking-tight">
          Selamat! Anda Telah Lulus.
        </h2>
        <p className="text-xl text-black/60 dark:text-white/60 max-w-2xl mx-auto">
          Anda telah menyelesaikan seluruh kurikulum di KelasWeb. Silakan klaim sertifikat digital Anda di bawah ini.
        </p>

        {/* Certificate Card */}
        <div 
          ref={certRef}
          id="certificate-print"
          className="relative aspect-[1.414/1] w-full max-w-3xl mx-auto bg-white text-black p-12 border-[16px] border-black shadow-2xl overflow-hidden print:m-0 print:shadow-none"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '40px 40px' }} />
          </div>

          <div className="relative h-full border-4 border-black/10 p-8 flex flex-col items-center justify-between">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-12 h-12 bg-black flex items-center justify-center">
                  <span className="text-white font-black text-xl">KW</span>
                </div>
                <span className="font-black text-2xl tracking-tighter uppercase">KelasWeb</span>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-[0.3em] opacity-40">Certificate of Completion</h3>
            </div>

            <div className="text-center space-y-6">
              <p className="text-lg italic font-serif">Dengan ini menyatakan bahwa</p>
              <h1 className="text-5xl font-black uppercase tracking-tight border-b-4 border-black pb-4 px-8 inline-block">
                {user?.name || 'Siswa KelasWeb'}
              </h1>
              <p className="text-lg max-w-lg mx-auto">
                Telah berhasil menyelesaikan program pelatihan intensif <strong>Web Development Mastery</strong> dan dinyatakan lulus dengan hasil yang memuaskan.
              </p>
            </div>

            <div className="w-full flex justify-between items-end">
              <div className="text-left space-y-1">
                <p className="text-xs font-bold uppercase opacity-40">Diberikan pada</p>
                <p className="font-bold">{today}</p>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                 <ShieldCheck size={48} className="opacity-20" />
                 <p className="text-[10px] font-mono opacity-40">Verified: KW-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>

              <div className="text-right space-y-1">
                <div className="w-32 h-px bg-black mb-2" />
                <p className="text-xs font-bold uppercase opacity-40">Founder KelasWeb</p>
                <p className="font-bold">ArekGresik.id</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-8">
          <button 
            onClick={handlePrint}
            className="btn btn-primary flex items-center gap-2 px-8 py-4"
          >
            <Download size={20} /> Unduh Sertifikat (PDF/Print)
          </button>
          <button className="btn border border-black dark:border-white text-black dark:text-white flex items-center gap-2 px-8 py-4 hover:bg-black/5 dark:hover:bg-white/5">
            <Share2 size={20} /> Bagikan ke LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
