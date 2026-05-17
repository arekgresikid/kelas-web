import React, { useState, useRef } from 'react';
import { 
  Cloud, 
  Rocket, 
  CheckCircle2, 
  FileCode2, 
  LayoutDashboard,
  Globe,
  Info,
  GitBranch,
  ShieldCheck,
  Zap,
  Settings,
  ChevronRight,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Konfigurasi Data Langkah ---
export const steps = [
  {
    id: 'persiapan',
    title: '1. Persiapan Dulu',
    icon: CheckCircle2,
    content: (
      <div className="space-y-6">
        <p className="text-base text-black/70 dark:text-white/70 leading-relaxed">
          Anggap saja kita ingin membuka restoran (website). Kita butuh dua hal utama: <strong>Resep Makanan (Kode Website)</strong> dan sebuah <strong>Dapur (Cloudflare)</strong>.
        </p>
        
        <div className="bg-gradient-to-br from-black to-slate-900 dark:from-[#0d0d0d] dark:to-[#161616] p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden group mb-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[60px]"></div>
            <h3 className="font-black text-white text-2xl mb-4 relative z-10 flex items-center gap-3">
              <span className="bg-amber-500 text-white p-2 rounded-xl"><FileCode2 className="w-6 h-6" /></span> 
              Belum Punya Kode Web? (Khusus Pemula)
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed relative z-10">
              Jika Anda sama sekali tidak bisa bahasa pemrograman, jangan panik! Anda tidak perlu mengetik kode rumit dari nol. Ini rahasianya:
            </p>
            
            <div className="space-y-4 relative z-10 font-sans">
              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-5">
                <div className="w-10 h-10 bg-amber-500/40 rounded-full flex items-center justify-center font-black text-white flex-shrink-0 border border-amber-400/50 shadow-inner mt-1">1</div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1">Cara Praktis & Lengkap: Google AI Studio Build</h4>
                  <p className="text-sm text-slate-200/90 leading-relaxed mb-3">
                    Buka <a href="https://ai.studio/build" target="_blank" rel="noreferrer" className="text-amber-400 font-bold hover:text-white underline transition-colors">ai.studio/build</a> dan ketik apa saja website yang Anda inginkan (misal: "Buatkan web portofolio estetik"). AI ini tidak hanya meracik 1 baris kode mentah, ia otomatis membangun keseluruhan <span className="text-white font-bold tracking-wide">Aplikasi Web Canggih Berbasis Framework modern</span> buat Anda, dan menampilkannya secara langsung!
                  </p>
                  <p className="text-sm text-slate-200/90 leading-relaxed mb-3">
                    Cukup periksa hasilnya. Kalau suka, tekan menu ikon gear (Settings) di sudut layar, lalu pilih opsi <strong>Download ZIP</strong>. File unduhan utuh tersebut siap pakai tanpa pusing perakitan (sudah dilengkapi struktur modern). Anda tidak perlu copy-paste lagi secara manual!
                  </p>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row gap-5">
                <div className="w-10 h-10 bg-amber-500/40 rounded-full flex items-center justify-center font-black text-white flex-shrink-0 border border-amber-400/50 shadow-inner mt-1">2</div>
                <div>
                  <h4 className="font-bold text-white text-lg mb-1">Cara Manual: Pakai AI Chat Biasa (Bikin 1 File HTML)</h4>
                  <p className="text-sm text-slate-200/90 leading-relaxed mb-3">
                    Luar biasa ringkas tapi terbatas, Anda dapat buka ChatGPT/Claude. Minta AI dengan tegas: <span className="bg-white/10 italic text-white px-2 py-0.5 rounded shadow-sm border border-white/20">"Tolong tuliskan kode 1 file HTML utuh berikut style CSS-nya sekaligus untuk web landing page tanpa folder-folder."</span>
                  </p>
                  <p className="text-sm text-slate-200/90 leading-relaxed mb-4">
                    AI bakal langsung memunculkan respons kotak misterius berisi baris-baris kode. Salin (Copy) semuanya secara penuh.
                  </p>
                  <ul className="text-sm text-slate-300 mt-2 space-y-3">
                    <li className="flex gap-2">
                       <span className="font-bold text-amber-400">A.</span>
                       <span>Buka aplikasi pengetik teks polos bernama <strong>Notepad</strong> (di Windows) atau TextEdit (di Mac). Lalu tempelkan (Paste) isi kodenya.</span>
                    </li>
                    <li className="flex gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl mt-2">
                       <span className="font-bold text-red-400">B.</span>
                       <div>
                          <span className="text-white font-bold block mb-1">Simpan Dengan Nama Sakral</span>
                          Klik "Save As". Pada baris isian File Name, aturannya cuma 1 dan tidak bisa ditawar. Beri nama persis seperti ini: <code className="bg-black/50 px-2 py-1 rounded text-orange-400 font-mono text-sm shadow-sm inline-block mx-1">index.html</code>. (Bagian 'Save as type' di bawahnya harus diubah menjadi <strong>All Files *.*</strong> ya!). 
                       </div>
                    </li>
                  </ul>
                  <div className="mt-4 flex items-start gap-2 bg-amber-950/40 p-3 rounded-lg border border-amber-800">
                    <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-300"><strong>Cek Berhasil:</strong> Klik dua kali nama file <code className="font-mono text-amber-400">index.html</code> tersebut. Jika browser menampilkan website cantik yang berfungsi sempurna, selamat Anda berhasil!</p>
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-black to-slate-900 dark:from-[#0d0d0d] dark:to-[#161616] p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden mb-8">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px]"></div>
           <h3 className="font-black text-white text-2xl mb-4 relative z-10 flex items-center gap-3">
              <span className="bg-emerald-500 text-white p-2 rounded-xl"><Rocket className="w-6 h-6" /></span> 
              Sudah Mengerti Koding? (Pakai Framework)
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed relative z-10">
              Jika Anda ingin membuat aplikasi web kelas atas yang interaktif, gunakan <span className="font-bold text-white">Automated Web Scaffolding</span> (pembuat kerangka proyek otomatis) menggunakan Terminal / Command Prompt:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 relative z-10 font-mono text-sm">
               <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors group">
                 <div className="flex items-center gap-2 mb-3">
                   <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                   <h4 className="font-bold text-white font-sans text-xs uppercase tracking-wider">React / Vue via Vite</h4>
                 </div>
                 <code className="text-emerald-400 bg-black/50 p-2.5 rounded-lg block break-all text-xs">npm create vite@latest nama-app</code>
               </div>

               <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors group">
                 <div className="flex items-center gap-2 mb-3">
                   <div className="w-3 h-3 rounded-full bg-slate-100"></div>
                   <h4 className="font-bold text-white font-sans text-xs uppercase tracking-wider">Next.js</h4>
                 </div>
                 <code className="text-emerald-400 bg-black/50 p-2.5 rounded-lg block break-all text-xs">npx create-next-app@latest nama-app</code>
               </div>

               <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors group">
                 <div className="flex items-center gap-2 mb-3">
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   <h4 className="font-bold text-white font-sans text-xs uppercase tracking-wider">Nuxt.js (Vue)</h4>
                 </div>
                 <code className="text-emerald-400 bg-black/50 p-2.5 rounded-lg block break-all text-xs">npx nuxi@latest init nama-app</code>
               </div>

               <div className="bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-colors group">
                 <div className="flex items-center gap-2 mb-3">
                   <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                   <h4 className="font-bold text-white font-sans text-xs uppercase tracking-wider">SvelteKit</h4>
                 </div>
                 <code className="text-emerald-400 bg-black/50 p-2.5 rounded-lg block break-all text-xs">npm create svelte@latest nama-app</code>
               </div>
            </div>

            <div className="mt-6 flex items-start gap-3 bg-emerald-950/30 p-4 rounded-xl border border-emerald-500/30 relative z-10 flex-col sm:flex-row">
               <Info className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
               <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
                 Buka terminal, jalankan salah satu perintah di atas, lalu masuk ke folder project tersebut dan jalankan <code className="bg-black/40 px-1 py-0.5 rounded text-green-300 font-mono text-xs">npm install</code>. Setelah itu, kode Anda siap diunggah ke GitHub!
               </p>
            </div>
        </div>

        <p className="text-lg text-black dark:text-white font-black flex items-center gap-2 mt-8 mb-2">
          Langkah Berikutnya: Siapkan Lapak Online
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mt-4">
          <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/10 dark:border-white/10 flex flex-col gap-4 items-start group hover:border-black dark:hover:border-white transition-all">
            <div className="w-12 h-12 bg-black/5 dark:bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all">
              <GitBranch className="w-6 h-6 text-black/75 dark:text-white/75 group-hover:text-white dark:group-hover:text-black" />
            </div>
            <div>
              <h3 className="font-bold text-black dark:text-white text-lg mb-1">Buat Akun GitHub (Buku Resep)</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                GitHub adalah tempat untuk menyimpan folder dan kode (HTML, CSS, gambar) website Anda secara aman, rapi, dan gratis selamanya.
              </p>
              <a href="https://github.com/signup" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 rounded-xl hover:opacity-95 transition-all">
                Daftar GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          
          <div className="bg-amber-500/5 dark:bg-amber-500/10 p-6 rounded-3xl border border-amber-500/20 flex flex-col gap-4 items-start group hover:border-amber-500 transition-all">
            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all">
              <Cloud className="w-6 h-6 text-amber-600 dark:text-amber-400 group-hover:text-white" />
            </div>
            <div>
              <h3 className="font-bold text-black dark:text-white text-lg mb-1">Buat Akun Cloudflare (Dapur)</h3>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed mb-4">
                Cloudflare nanti yang akan otomatis mengambil kode dari GitHub Anda, menyiapkannya, lalu menampilkannya ke seluruh dunia supaya bisa diakses lewat link.
              </p>
              <a href="https://dash.cloudflare.com/sign-up" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold bg-amber-500 text-white px-4 py-2.5 rounded-xl hover:bg-amber-600 transition-all">
                Daftar Cloudflare <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-5 rounded-2xl flex gap-4 mt-4">
          <Info className="w-6 h-6 text-black/50 dark:text-white/50 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-black/75 dark:text-white/75 leading-relaxed">
            <strong>Catatan Penting:</strong> Setelah mendaftar, pastikan Anda <strong>memverifikasi email</strong> masuk yang dikirim oleh GitHub dan Cloudflare. Jika email belum diverifikasi, biasanya ada beberapa fitur yang terkunci.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 'panduan-github',
    title: '2. Upload ke GitHub',
    icon: Rocket,
    content: (
      <div className="space-y-6">
        <p className="text-base text-black/70 dark:text-white/70 leading-relaxed">
          Tahap pertama, kita akan memindahkan file-file website yang ada di komputer Anda ke dalam GitHub. Cara paling mudah bagi pemula adalah lewat Web (drag-and-drop).
        </p>

        <div className="space-y-6 mt-6">
          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black flex-shrink-0 text-lg shadow-md mt-1">1</div>
             <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/10 dark:border-white/10 flex-1">
               <h4 className="font-bold text-black dark:text-white text-lg">Bikin Wadah (Repository) Baru</h4>
               <p className="text-sm text-black/60 dark:text-white/60 mt-2 leading-relaxed">Login ke situs <strong>github.com</strong>. Di layar utama (bagian kiri atau ujung kanan atas), cari dan klik tombol dengan tulisan <span className="inline-block bg-green-600 text-white px-2 py-1 rounded text-xs font-bold mx-1">New repository</span>.</p>
             </div>
          </div>

          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black flex-shrink-0 text-lg shadow-md mt-1">2</div>
             <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/10 dark:border-white/10 flex-1">
               <h4 className="font-bold text-black dark:text-white text-lg">Beri Nama Proyek Anda</h4>
               <p className="text-sm text-black/60 dark:text-white/60 mt-2 leading-relaxed">Isikan kotak <strong>Repository name</strong> dengan nama website tanpa spasi panjang (misalnya: <code>website-portofolio-sayang</code>). Hiraukan setelan rumit di bawahnya, langsung geser layar ke paling bawah dan klik tombol hijau <span className="inline-block bg-green-600 text-white px-2 py-1 rounded text-xs font-bold mx-1">Create repository</span>.</p>
             </div>
          </div>

          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black flex-shrink-0 text-lg shadow-md mt-1">3</div>
             <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/10 dark:border-white/10 flex-1">
               <h4 className="font-bold text-black dark:text-white text-lg">Unggah File Anda (Upload)</h4>
               <p className="text-sm text-black/60 dark:text-white/60 mt-2 leading-relaxed mb-4">
                 Selesai dibuat, layar akan berisi instruksi kode. Anggap abaikan saja teks itu. Temukan dan klik link kecil berwarna biru: <span className="text-amber-500 font-bold underline">"uploading an existing file"</span>.
               </p>
               <div className="bg-black/10 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
                  <div className="p-3 bg-white dark:bg-[#161616] rounded-xl shadow-sm"><FileCode2 className="w-6 h-6 text-amber-500" /></div>
                  <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed">Jendela file terbuka: pilih semua file website yang ada di dalam map (folder) komputer Anda, lalu seret/drag semuanya langsung lempar/jatuhkan ke kotak besar yang ada di halaman browser GitHub tersebut.</p>
               </div>
             </div>
          </div>

          <div className="flex gap-4">
             <div className="w-10 h-10 rounded-full bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black flex-shrink-0 text-lg shadow-md mt-1">4</div>
             <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/10 dark:border-white/10 flex-1">
               <h4 className="font-bold text-black dark:text-white text-lg">Simpan Permanen (Commit)</h4>
               <p className="text-sm text-black/60 dark:text-white/60 mt-2 leading-relaxed">Tunggu proses loading tiap file tuntas. Apabila selesai, klik tombol hijau di bawah yaitu <span className="inline-block bg-green-600 text-white px-2 py-1 rounded text-xs font-bold mx-1">Commit changes</span>. Mantap! Kode Anda kini aman tersimpan di server GitHub.</p>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'cek-kode',
    title: '3. Awas: Harus Cek Ini!',
    icon: FileCode2,
    content: (
      <div className="space-y-6">
        <p className="text-base text-black/70 dark:text-white/70 leading-relaxed">
          Ada <span className="font-bold text-red-600">Kesalahan No. 1</span> yang sering menggagalkan proses pemula: Penempatan Susunan Folder.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* SALAH */}
          <div className="bg-red-500/5 dark:bg-red-500/10 border-2 border-red-500/20 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute top-4 right-4 bg-red-600/10 dark:bg-red-600/20 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">❌ SALAH (Error)</div>
            <h4 className="font-bold text-red-600 dark:text-red-400 text-lg mt-8 mb-4">File "Diuselkan" Dalam Folder</h4>
            <p className="text-xs text-red-700/80 dark:text-red-400/80 mb-4">Cloudflare akan error karena tidak langsung menemukan file utama <code>index.html</code> begitu ia membuka wadah repository.</p>
            
            <div className="font-mono text-xs space-y-2 bg-black/5 dark:bg-black/50 p-4 rounded-2xl border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2 text-black/80 dark:text-white/80"><span className="text-slate-400">📁</span> nama-repo-github/</div>
              <div className="ml-4 flex items-center gap-2 text-red-600 font-bold"><span className="text-orange-400">📁</span> Folder-Web-Ku/</div>
              <div className="ml-8 flex items-center gap-2 text-slate-500 opacity-50"><span className="text-blue-400">📄</span> <del>index.html</del> (Tersembunyi!)</div>
            </div>
          </div>

          {/* BENAR */}
          <div className="bg-green-500/5 dark:bg-green-500/10 border-2 border-green-500/30 rounded-3xl p-6 relative overflow-hidden group shadow-lg">
            <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-sm">✅ BENAR (Berhasil)</div>
            <h4 className="font-bold text-green-700 dark:text-green-400 text-lg mt-8 mb-4">File Langsung Terbuka</h4>
            <p className="text-xs text-green-800/80 dark:text-green-400/80 mb-4">Begitu Cloudflare mengecek kode Anda, ia langsung menemukan Pintu Depan dan alat-alat lainnya tanpa kebingungan mencari.</p>
            
            <div className="font-mono text-xs space-y-2 bg-black/5 dark:bg-black/50 p-4 rounded-2xl border border-green-500/20 dark:border-green-500/30 shadow-inner">
              <div className="flex items-center gap-2 text-black/80 dark:text-white/80"><span className="text-slate-400">📁</span> nama-repo-github/</div>
              <div className="ml-4 flex justify-between items-center bg-green-500/10 dark:bg-green-500/20 p-2 rounded-lg">
                <span className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold"><span className="text-blue-500">📄</span> index.html</span>
                <span className="text-[10px] bg-green-500 text-white px-2 rounded-full font-sans uppercase">OK</span>
              </div>
              <div className="ml-4 flex items-center gap-2 text-black/70 dark:text-white/70"><span className="text-blue-400">📄</span> style.css</div>
              <div className="ml-4 flex items-center gap-2 text-black/70 dark:text-white/70"><span className="text-orange-400">📁</span> assets/</div>
            </div>
          </div>
        </div>

        <div className="bg-black/5 dark:bg-white/5 p-5 rounded-2xl border border-black/10 dark:border-white/10 mt-4 text-sm text-black/75 dark:text-white/75">
          <strong>Perbaiki jika masih salah:</strong> Sebelum di-upload ke GitHub, buka dulu 'Folder-Web-Ku' di komputer. Nah, blok semua isinya lalu seret/drag semuanya. JANGAN menyeret foldernya utuh-utuh, seret <strong>isinya</strong> saja!
        </div>
      </div>
    )
  },
  {
    id: 'dashboard-cf',
    title: '4. Masuk ke Cloudflare',
    icon: LayoutDashboard,
    content: (
      <div className="space-y-6">
        <p className="text-base text-black/70 dark:text-white/70 leading-relaxed">
          Jika persiapan dan kode siap, mari beralih meminta bagian 'Dapur' (Cloudflare) menyiapkannya. Gunakan Laptop/PC agar tampilan menu lengkap!
        </p>

        <div className="bg-black dark:bg-[#0d0d0d] text-white p-8 rounded-3xl shadow-xl overflow-hidden border border-black/10 dark:border-white/10 relative mt-6">
           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl"></div>
           
           <ol className="space-y-6 relative z-10 text-sm md:text-base">
             <li className="flex gap-4">
               <span className="font-mono text-amber-500 font-bold">1</span>
               <p className="text-slate-300">Akses dashboard Cloudflare di <a href="https://dash.cloudflare.com" target="_blank" rel="noreferrer" className="text-white font-bold underline">dash.cloudflare.com</a> lalu masuk/Login pakai akun baru.</p>
             </li>
             <li className="flex gap-4">
               <span className="font-mono text-amber-500 font-bold">2</span>
               <div>
                  <p className="text-slate-300 font-sans">Tengok pada <strong>Deretan Menu kiri atas layar (Sidebar)</strong>.</p>
                  <div className="mt-3 text-xs bg-white/5 p-4 rounded-xl border border-white/5 inline-block text-slate-400 font-mono leading-relaxed space-y-2">
                    <div className="flex items-center gap-2">☁️ Websites</div>
                    <div className="flex items-center gap-2">🌐 Domain Registration</div>
                    <div className="flex items-center gap-2 bg-amber-500/20 text-amber-400 font-bold px-3 py-2 rounded-lg outline outline-1 outline-amber-500 shadow-lg shadow-amber-500/10">
                       ⚡ Workers & Pages &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;← (Klik yang Ini!)
                    </div>
                    <div className="flex items-center gap-2">🛡️ Zero Trust</div>
                  </div>
               </div>
             </li>
             <li className="flex gap-4">
               <span className="font-mono text-amber-500 font-bold">3</span>
               <div>
                  <p className="text-slate-300">Masuk layar baru. Di bagian agak tengah ke atas-kanan, cari dan tekan tombol biru <span className="inline-block bg-blue-600 px-3 py-1 rounded text-white font-bold text-xs mt-1">Create application</span>.</p>
               </div>
             </li>
             <li className="flex gap-4">
               <span className="font-mono text-amber-500 font-bold">4</span>
               <div>
                  <p className="text-slate-300">Banyak opsi kotak. Harap cermati tab menu atas layar. Klik tab pilihan bertuliskan <span className="inline-block border-b-2 border-amber-500 font-bold text-white px-2 mt-1">Pages</span>.</p>
               </div>
             </li>
             <li className="flex gap-4 items-center">
               <span className="font-mono text-amber-500 font-bold">5</span>
               <div>
                  <p className="text-slate-300">Geser mouse ke sedikit bawah, temukan opsi "Import existing", lalu klik panah <span className="inline-block bg-white text-black px-3 py-1 rounded shadow text-xs font-bold whitespace-nowrap mt-1"><GitBranch className="w-3.5 h-3.5 inline mr-1 -mt-0.5" /> Connect to Git</span>.</p>
               </div>
             </li>
           </ol>
        </div>
      </div>
    )
  },
  {
    id: 'hubungkan-git',
    title: '5. Sinkronkan dengan GitHub',
    icon: ShieldCheck,
    content: (
      <div className="space-y-6">
        <p className="text-base text-black/70 dark:text-white/70 leading-relaxed">
          Cloudflare memohon izin sinkronisasi. Ia butuh dihubungkan secara teknis terlebih dahulu ke profil GitHub pribadi Anda. Tenang, klik-klik sedikit saja!
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-black/5 dark:bg-white/5 rounded-3xl p-6 shadow-sm border border-black/10 dark:border-white/10">
             <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-4"><ShieldCheck className="w-6 h-6" /></div>
             <h4 className="font-bold text-black dark:text-white mb-2">Pop-up Layar Izin</h4>
             <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
               Di tahapan terakhir Klik "Connect to Git", Anda bakal otomatis menjumpai popup atau tab baru loncat ganti ke tampilan GitHub. Anda mungkin diharuskan ketik user passwordnya lagi demi keamanan (Login ulang biasa).
             </p>
          </div>

          <div className="bg-black/5 dark:bg-white/5 rounded-3xl p-6 shadow-sm border border-black/10 dark:border-white/10">
             <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-600 mb-4"><CheckCircle2 className="w-6 h-6" /></div>
             <h4 className="font-bold text-black dark:text-white mb-2">Bebaskan Izin ke Semua (Tergampang)</h4>
             <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
               Di layar konfirmasi Anda menjumpai pertanyaan instalasi ini berlaku untuk repositori (wadah) mana. Sangat disarankan pilih lingkaran yang isinya bertuliskan <strong className="text-black dark:text-white bg-black/5 dark:bg-white/10 px-2 py-0.5 rounded font-sans">All repositories</strong> agar ke depan bebas hambatan.
             </p>
          </div>
        </div>

        <div className="bg-black/5 dark:bg-white/5 p-6 rounded-3xl border border-black/10 dark:border-white/10 text-center mt-4">
           <p className="text-sm text-black/60 dark:text-white/60 mb-4">Temukan di scroll bawah-bawah ada tombol hijau terang begini. Silahkan dipencet!</p>
           <button className="bg-green-600 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 mx-auto pointer-events-none hover:opacity-90">
             Install & Authorize <CheckCircle2 className="w-5 h-5" />
           </button>
           <p className="text-xs text-black/40 dark:text-white/40 mt-4 italic">Berhasil memberi izin koneksi. Biasanya browser otomatis kembali lagi mendarat ke halaman Cloudflare Pages tadi.</p>
        </div>
      </div>
    )
  },
  {
    id: 'konfigurasi',
    title: '6. Pilih & Bangun Jembatan',
    icon: Settings,
    content: (
      <div className="space-y-6">
        <p className="text-base text-black/70 dark:text-white/70 leading-relaxed">
          Perlihatkan yang mana proyek Anda? Mari tuntun si Cloudflare bagaimana mencampur gado-gadonya (setup pemahaman mesin). 
        </p>
        
        <div className="space-y-4">
          <div className="flex gap-4 p-5 border-l-4 border-black dark:border-white bg-black/5 dark:bg-white/5 shadow-sm rounded-r-xl">
             <div className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold text-black/80 dark:text-white/80 text-sm flex-shrink-0">1</div>
             <div>
                <p className="text-base text-black dark:text-white font-bold">Pilih Proyek Spesifiknya</p>
                <p className="text-sm text-black/60 dark:text-white/60 mt-2 leading-relaxed">Layar Cloudflare menyodorkan semua list nama wadah yang nongkrong di GitHub. Sorot (klik) pada nama projek Anda tadi (ex: <code>website-portofolio-sayang</code>). Usai disorot ada highlight keabu-abuan. Lantas bergegas pencet tombol biru <span className="font-bold border border-blue-500/20 bg-blue-500/10 text-blue-500 px-2 rounded mx-1 text-xs py-0.5">Begin setup</span> di siku kanan layar bawah.</p>
             </div>
          </div>
          
          <div className="flex gap-4 p-5 border-l-4 border-amber-500 bg-amber-500/5 dark:bg-amber-500/10 shadow-sm rounded-r-xl">
             <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center font-bold text-amber-500 text-sm flex-shrink-0">2</div>
             <div className="w-full">
                <p className="text-base text-black dark:text-white font-bold mb-2">Build Settings (Fokus Sini!)</p>
                <p className="text-sm text-black/60 dark:text-white/60 mb-5 leading-relaxed">Di form konfirmasi ini Anda boleh menamakannya ulang sesuai keinginan di kotak Project Name. Scroll terus ke bawah cari grup spesifik bernama <strong>Build settings</strong>.</p>
                <div className="flex flex-col gap-5">
                  
                  <div className="bg-white dark:bg-[#161616] p-5 rounded-xl shadow-sm border border-amber-500/20 hover:border-amber-500 transition-colors">
                     <div className="inline-flex bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] uppercase font-black px-3 py-1 rounded-full mb-3">Jika Cuma HTML Biasa (Standard)</div>
                     <div className="flex flex-wrap gap-4 text-xs text-black/60 dark:text-white/60 mt-2">
                       <div className="flex-1 min-w-[150px]">
                         <span className="font-semibold block mb-1">Framework preset:</span>
                         <div className="bg-black/5 dark:bg-black/40 p-2 rounded text-black dark:text-white font-mono text-center">None</div>
                       </div>
                       <div className="flex-1 min-w-[150px]">
                         <span className="font-semibold block mb-1">Build command:</span>
                         <div className="bg-black/5 dark:bg-black/40 p-2 rounded text-black/40 dark:text-white/40 italic font-mono text-center">(kosongkan)</div>
                       </div>
                       <div className="flex-1 min-w-[150px]">
                         <span className="font-semibold block mb-1">Build output:</span>
                         <div className="bg-black/5 dark:bg-black/40 p-2 rounded text-black dark:text-white font-mono text-center">/</div>
                       </div>
                     </div>
                  </div>

                  <div className="bg-gradient-to-br from-black/5 to-amber-500/5 dark:from-[#161616] dark:to-[#0d0d0d] p-5 rounded-xl shadow-sm border border-black/10 dark:border-white/10">
                     <div className="inline-flex bg-amber-500 text-white text-[10px] uppercase font-black px-3 py-1 rounded-full mb-3">Jika Pakai Framework (Gaya Modern)</div>
                     <div className="text-sm text-black/70 dark:text-white/70 mt-2 space-y-4">
                       <p>Apabila website Anda hasil buatan framework modern. Klik pada <strong>Framework preset</strong> dan pilih alat Anda. Kolom <em>Command</em> dan <em>Output</em> biasanya akan otomatis terisi seperti ini:</p>
                       
                       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                         <div className="bg-white dark:bg-[#161616] p-4 rounded-xl border border-black/10 dark:border-white/10 shadow-sm relative overflow-hidden group">
                           <h5 className="font-bold text-black dark:text-white mb-3 flex items-center gap-2 relative z-10"><span className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white"></span> Next.js</h5>
                           <ul className="text-[10px] space-y-2 text-black/60 dark:text-white/60 font-mono relative z-10">
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Preset</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded font-semibold text-black dark:text-white border border-black/5 dark:border-white/5">Next.js</div></li>
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Cmd</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded border border-black/5 dark:border-white/5 overflow-x-auto text-nowrap [&::-webkit-scrollbar]:hidden">npx @cloudflare/next-on-pages</div></li>
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Output</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded border border-black/5 dark:border-white/5 overflow-x-auto text-nowrap [&::-webkit-scrollbar]:hidden">.vercel/output/static</div></li>
                           </ul>
                         </div>
                         
                         <div className="bg-white dark:bg-[#161616] p-4 rounded-xl border border-black/10 dark:border-white/10 shadow-sm relative overflow-hidden group">
                           <h5 className="font-bold text-black dark:text-white mb-3 flex items-center gap-2 relative z-10"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Nuxt.js</h5>
                           <ul className="text-[10px] space-y-2 text-black/60 dark:text-white/60 font-mono relative z-10">
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Preset</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded font-semibold text-black dark:text-white border border-black/5 dark:border-white/5">Nuxt.js</div></li>
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Cmd</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded border border-black/5 dark:border-white/5 overflow-x-auto text-nowrap [&::-webkit-scrollbar]:hidden">npm run generate</div></li>
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Output</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded border border-black/5 dark:border-white/5 overflow-x-auto text-nowrap [&::-webkit-scrollbar]:hidden">.output/public</div></li>
                           </ul>
                         </div>

                         <div className="bg-white dark:bg-[#161616] p-4 rounded-xl border border-black/10 dark:border-white/10 shadow-sm relative overflow-hidden group">
                           <h5 className="font-bold text-black dark:text-white mb-3 flex items-center gap-2 relative z-10"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> SvelteKit</h5>
                           <ul className="text-[10px] space-y-2 text-black/60 dark:text-white/60 font-mono relative z-10">
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Preset</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded font-semibold text-black dark:text-white border border-black/5 dark:border-white/5">SvelteKit</div></li>
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Cmd</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded border border-black/5 dark:border-white/5 overflow-x-auto text-nowrap [&::-webkit-scrollbar]:hidden">npm run build</div></li>
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Output</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded border border-black/5 dark:border-white/5 overflow-x-auto text-nowrap [&::-webkit-scrollbar]:hidden">.svelte-kit/cloudflare</div></li>
                           </ul>
                         </div>

                         <div className="bg-white dark:bg-[#161616] p-4 rounded-xl border border-black/10 dark:border-white/10 shadow-sm relative overflow-hidden group">
                           <h5 className="font-bold text-black dark:text-white mb-3 flex items-center gap-2 relative z-10"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Vite / React</h5>
                           <ul className="text-[10px] space-y-2 text-black/60 dark:text-white/60 font-mono relative z-10">
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Preset</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded font-semibold text-black dark:text-white border border-black/5 dark:border-white/5">Vite</div></li>
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Cmd</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded border border-black/5 dark:border-white/5 overflow-x-auto text-nowrap [&::-webkit-scrollbar]:hidden">npm run build</div></li>
                             <li><span className="text-black/40 dark:text-white/40 font-sans text-[8px] uppercase tracking-wider block mb-0.5">Output</span> <div className="bg-black/5 dark:bg-black/40 py-1.5 px-2 rounded border border-black/5 dark:border-white/5 overflow-x-auto text-nowrap [&::-webkit-scrollbar]:hidden">dist</div></li>
                           </ul>
                         </div>
                       </div>
                       
                       <div className="bg-green-500/10 p-3 rounded-xl text-green-700 dark:text-green-400 flex gap-3 font-medium mt-4 items-center">
                          <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-green-600" />
                          <span className="text-sm">Bila Preset dipilih, otomatis kolom setting di bawahnya ikut menyesuaikan. Lanjut!!</span>
                       </div>
                     </div>
                  </div>

                </div>
             </div>
          </div>

          <div className="flex gap-4 p-5 border-l-4 border-purple-500 bg-purple-500/5 dark:bg-purple-500/10 shadow-sm rounded-r-xl">
             <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center font-bold text-purple-600 text-sm flex-shrink-0">3</div>
             <div className="w-full">
               <p className="text-base text-black dark:text-white font-bold mb-2">Alternatif: Deploy via Wrangler CLI (Tingkat Lanjut)</p>
               <p className="text-sm text-black/60 dark:text-white/60 mb-4 leading-relaxed">Jika Anda ingin mendeploy atau mengatur proyek langsung dari terminal/Command Prompt (tanpa buka dashboard), Anda bisa menggunakan <strong>Wrangler</strong>, alat resmi dari Cloudflare.</p>
               
               <div className="space-y-4">
                 <div className="bg-black dark:bg-[#0d0d0d] rounded-xl p-4 shadow-xl border border-black/10 dark:border-white/10 font-mono text-sm relative overflow-hidden group">
                    <div className="relative z-10">
                      <p className="text-slate-400 text-xs mb-2 uppercase tracking-widest font-sans font-bold flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-yellow-400" /> Langkah 1: Install Wrangler</p>
                      <code className="text-emerald-400 block bg-black/40 p-2.5 rounded-lg border border-white/5 text-xs">npm install -g wrangler</code>
                      <p className="text-slate-500 text-[11px] mt-3 font-sans">Menginstall Cloudflare CLI secara global di komputer Anda agar bisa dipanggil darimana saja.</p>
                    </div>
                 </div>
                 
                 <div className="bg-black dark:bg-[#0d0d0d] rounded-xl p-4 shadow-xl border border-black/10 dark:border-white/10 font-mono text-sm relative overflow-hidden group">
                    <div className="relative z-10">
                      <p className="text-slate-400 text-xs mb-2 uppercase tracking-widest font-sans font-bold flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-yellow-400" /> Langkah 2: Autentikasi Login</p>
                      <code className="text-emerald-400 block bg-black/40 p-2.5 rounded-lg border border-white/5 text-xs">wrangler login</code>
                      <p className="text-slate-500 text-[11px] mt-3 font-sans">Akan membuka browser untuk konfirmasi akun Cloudflare Anda. Izinkan akses untuk melanjutkan.</p>
                    </div>
                 </div>

                 <div className="bg-black dark:bg-[#0d0d0d] rounded-xl p-4 shadow-xl border border-black/10 dark:border-white/10 font-mono text-sm relative overflow-hidden group">
                    <div className="relative z-10">
                      <p className="text-slate-400 text-xs mb-2 uppercase tracking-widest font-sans font-bold flex items-center gap-2"><Zap className="w-3.5 h-3.5 text-yellow-400" /> Langkah 3: Deploy Proyek</p>
                      <code className="text-emerald-400 block bg-black/40 p-2.5 rounded-lg border border-white/5 text-xs overflow-x-auto">wrangler pages deploy &lt;FOLDER_OUTPUT&gt;</code>
                      <div className="text-slate-400 text-[11px] mt-4 font-sans space-y-2 bg-white/5 p-3 rounded-lg border border-white/5">
                         <p className="text-slate-300 font-semibold mb-2">Contoh folder output sesuai framework:</p>
                         <ul className="list-disc pl-4 space-y-1">
                            <li><strong className="text-slate-200 font-mono text-[10px]">HTML Biasa:</strong> <code className="text-amber-400 font-mono">wrangler pages deploy .</code> (titik = folder saat ini)</li>
                            <li><strong className="text-slate-200 font-mono text-[10px]">React/Vite:</strong> <code className="text-amber-400 font-mono">wrangler pages deploy dist</code></li>
                            <li><strong className="text-slate-200 font-mono text-[10px]">Next.js:</strong> <code className="text-amber-400 font-mono">wrangler pages deploy .vercel/output/static</code></li>
                         </ul>
                      </div>
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'deploy',
    title: '7. Sebarkan ke Semesta Internet',
    icon: Globe,
    content: (
      <div className="space-y-6">
        
        <div className="bg-black dark:bg-[#0d0d0d] border border-black/10 dark:border-white/10 p-8 md:p-12 rounded-[2.5rem] text-center shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl opacity-50 transition-opacity duration-700"></div>
           
           <h3 className="text-white text-3xl font-black mb-6 relative z-10">Langkah Penghabisan 🚀!</h3>
           
           <p className="text-slate-300 text-sm md:text-base mb-10 max-w-sm mx-auto relative z-10 leading-relaxed font-sans">
             Di bagian paling bawah layar konfigurasi Cloudflare Pages, tekan tombol biru solid yang bertuliskan:
           </p>

           <div className="inline-flex items-center justify-center px-10 py-4 bg-amber-500 text-white font-black rounded-2xl shadow-[0_0_40px_-5px_rgba(245,158,11,0.4)] mb-12 relative z-10 transform hover:scale-105 transition-transform border border-amber-400 text-sm cursor-pointer select-none">
              Save and Deploy
           </div>

           <div className="w-full bg-white/5 backdrop-blur-sm p-5 md:p-6 rounded-3xl relative z-10 max-w-md mx-auto border border-white/5 space-y-4 shadow-xl">
             <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
               <motion.div 
                  animate={{ x: ["-100%", "250%"] }}
                  transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-500 to-transparent"
               />
             </div>
             <div className="text-left text-xs font-mono text-slate-400 space-y-2.5">
               <div className="flex gap-3"><span className="text-green-400 opacity-90">[✓] OK.</span> <span>Membaca kode sumber GitHub Anda...</span></div>
               <div className="flex gap-3 text-white"><span className="opacity-90">[⚡] BUILD...</span> <span className="animate-pulse">Menyiapkan lingkungan build proyek...</span></div>
               <div className="flex gap-3 text-slate-500"><span>[ ] Tunggu.</span> <span>Melepas ke orbit publik (biasanya sekitar 1-2 menit).</span></div>
             </div>
           </div>
        </div>

        <div className="bg-green-500/5 dark:bg-green-500/10 p-8 rounded-[2.5rem] border-2 border-green-500/20 text-center mt-6 shadow-sm relative overflow-hidden">
           <div className="absolute -top-10 -right-10 text-green-500/10 rotate-12 opacity-50"><Globe className="w-48 h-48" /></div>
           <div className="relative z-10">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 mx-auto mb-6 border-2 border-green-500/30 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-black text-green-800 dark:text-green-400 text-2xl mb-3">HORE! Website Telah Mengudara</h4>
              <p className="text-sm text-green-800/80 dark:text-green-400/80 mb-6 max-w-lg mx-auto leading-relaxed">
                Carilah status hijau tebal bertuliskan 'Success'. Cloudflare akan memberikan link URL permanen unik yang super kencang di seluruh dunia. Klik link tersebut untuk membagikan karya Anda kepada teman atau rekruter:
              </p>
              <span className="inline-block bg-white dark:bg-[#161616] border-2 border-green-500/20 text-amber-600 dark:text-amber-400 px-6 sm:px-8 py-3.5 rounded-2xl font-mono text-sm sm:text-base font-bold shadow-sm select-all">
                https://website-portofolio-sayang.pages.dev <ExternalLink className="w-4 h-4 inline ml-2 -mt-1 text-black/50 dark:text-white/50" />
              </span>
           </div>
        </div>
        
        <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl flex gap-5 md:items-center flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-amber-500/20 p-3 rounded-2xl flex-shrink-0 animate-bounce">
             <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-sm md:text-base text-amber-900 dark:text-amber-200 leading-relaxed font-sans">
              <strong className="font-black block mb-1">Mutiara Pamungkas (Continuous Deployment): </strong>
              Semenjak Anda menekan tombol ini: Asalkan ke depan Anda merevisi ulang web (misalnya mengganti foto/teks), lalu menyimpannya di file lokal dan mengunggahnya (Commit Ulang) ke GitHub barusan, <span className="bg-amber-500/20 px-1 font-bold rounded">Cloudflare Pages otomatis mendeteksi perubahan tersebut dan memperbarui website Anda sendiri secara instan dan 100% otomatis! Tinggal rebahan asyik!</span>
            </p>
          </div>
        </div>

      </div>
    )
  }
];

// --- Komponen Utama ---
export default function CloudflareTutorialBonus() {
  const [activeStep, setActiveStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleStepChange = (newStep: number) => {
    setActiveStep(newStep);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-amber-500/10 selection:text-amber-500 scroll-smooth pb-20 dark:text-white text-black">
      {/* Header Premium */}
      <header className="pb-12 text-left space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-4 py-1.5 rounded-full border border-amber-500/20 text-[10px] font-black uppercase tracking-[0.2em]"
        >
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Spesial Untuk Mahasiswa & Pemula</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black leading-[1.15] tracking-tight text-black dark:text-white"
        >
          Langkah Sakti Online-kan Web<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600">Gratis 100% Selamanya</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-black/60 dark:text-white/60 max-w-3xl text-sm md:text-base leading-relaxed"
        >
          Panduan interaktif langkah-demi-langkah dengan bahasa awam dan analogi sederhana untuk meluncurkan website impian Anda dari rakitan GitHub langsung ke angkasa Cloudflare Pages dengan performa kilat dan gratis selamanya.
        </motion.p>
      </header>

      {/* Konten Utama Bento Grid */}
      <div ref={contentRef} className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Navigasi Rute Latihan */}
        <aside className="lg:col-span-4 space-y-2 sticky top-24 z-10">
          <div className="space-y-1.5 bg-black/5 dark:bg-white/5 p-4 rounded-3xl border border-black/10 dark:border-white/10 backdrop-blur-xl">
            <h4 className="px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-black/40 dark:text-white/40">Rute Latihan</h4>
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepChange(index)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all text-left relative overflow-hidden group ${
                  activeStep === index 
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg shadow-black/5 dark:shadow-white/5 font-bold' 
                    : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 font-medium'
                }`}
              >
                <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center transition-all ${
                  activeStep === index 
                    ? 'bg-white/20 dark:bg-black/20 text-white dark:text-black' 
                    : 'bg-black/5 dark:bg-white/10 text-black/50 dark:text-white/50 border border-black/5 dark:border-white/5'
                }`}>
                  {React.createElement(step.icon, { className: "w-4.5 h-4.5" })}
                </div>
                <span className="text-xs sm:text-sm tracking-tight">{step.title}</span>
                {activeStep === index && (
                  <motion.div layoutId="indicator" className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-white/10 dark:bg-black/10">
                    <ChevronRight className="w-3.5 h-3.5 text-white dark:text-black" strokeWidth={3} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </aside>

        {/* Kotak Tampilan Detil Konten */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.section
              key={steps[activeStep].id}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-white dark:bg-[#161616] rounded-[2.5rem] p-6 sm:p-10 md:p-12 border border-black/10 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] min-h-[500px]"
            >
              {/* Info Header Langkah Aktif */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 mb-10 border-b border-black/5 dark:border-white/5 pb-6">
                <div className="w-14 h-14 bg-black dark:bg-white shadow-inner rounded-2xl flex items-center justify-center text-white dark:text-black flex-shrink-0">
                  {React.createElement(steps[activeStep].icon, { className: "w-7 h-7" })}
                </div>
                <div>
                  <span className="text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest px-2.5 py-1 bg-amber-500/10 rounded-md border border-amber-500/15 inline-block mb-1.5">Bagian {activeStep + 1} dari {steps.length}</span>
                  <h2 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight leading-tight">{steps[activeStep].title}</h2>
                </div>
              </div>

              {/* Tempat merender isi html langkah saat ini */}
              <div className="w-full">
                {steps[activeStep].content}
              </div>

              {/* Bar Navigasi Bawah */}
              <div className="mt-14 pt-8 border-t border-black/5 dark:border-white/5 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                <button 
                  disabled={activeStep === 0}
                  onClick={() => handleStepChange(activeStep - 1)}
                  className={`flex items-center justify-center gap-2 text-xs font-bold transition-all w-full sm:w-auto py-3 px-6 rounded-xl border border-black dark:border-white text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-0 disabled:pointer-events-none`}
                >
                  <ArrowRight className="w-4 h-4 rotate-180" /> Langkah Sebelumnya
                </button>
                
                <div className="hidden sm:flex items-center gap-2">
                   {steps.map((_, i) => (
                     <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeStep ? 'w-5 bg-black dark:bg-white' : 'w-1.5 bg-black/10 dark:bg-white/10'}`} />
                   ))}
                </div>
                
                <button 
                  onClick={() => activeStep < steps.length - 1 ? handleStepChange(activeStep + 1) : null}
                  className={`flex items-center justify-center gap-2 text-xs font-bold px-8 py-3.5 rounded-xl transition-all w-full sm:w-auto shadow-md ${
                    activeStep === steps.length - 1 
                      ? 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-500/10' 
                      : 'bg-black text-white dark:bg-white dark:text-black hover:opacity-95'
                  }`}
                >
                  {activeStep === steps.length - 1 ? 'Selesai & Mulai Deploy!' : 'Langkah Selanjutnya'} 
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.section>
          </AnimatePresence>

          {/* Kotak Bantuan Hubungi Dokumentasi / Error */}
          <div className="mt-12 bg-black/5 dark:bg-white/5 p-6 sm:p-8 rounded-[2rem] border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center gap-6 justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-[40px]"></div>
            <div className="flex gap-5 items-center relative z-10 w-full">
              <div className="w-12 h-12 bg-black/5 dark:bg-white/10 rounded-2xl flex items-center justify-center text-black dark:text-white flex-shrink-0 border border-black/5 dark:border-white/5">
                <ShieldCheck className="w-6 h-6 text-black/85 dark:text-white/85" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-black dark:text-white text-sm">Masih Mengalami Masalah/Error?</h4>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed pr-4">Jangan menyerah! Anda dapat membaca dokumentasi resmi Cloudflare Pages yang sangat rinci dan terpercaya berikut.</p>
              </div>
            </div>
            <a href="https://developers.cloudflare.com/pages/" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 text-xs font-bold bg-white dark:bg-black border border-black/10 dark:border-white/15 px-6 py-3.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all shadow-sm whitespace-nowrap w-full sm:w-auto relative z-10 text-black dark:text-white">
              Dokumentasi Resmi <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
