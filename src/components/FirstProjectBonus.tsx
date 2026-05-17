import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, 
  Target, 
  Award, 
  Compass, 
  Coins, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Sparkles
} from 'lucide-react';
import { CLIENTS } from '../data/clientsData';
import type { ClientProfile, DialogOption } from '../data/clientsData';

// ==========================================
// ISI MATERI DOKUMENTASI TAB PANDUAN
// ==========================================
interface TabContent {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const FirstProjectBonus: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('roadmap');
  const [activeProposalTemplate, setActiveProposalTemplate] = useState<string>('ukm');
  
  // State Game Simulator
  const [selectedClient, setSelectedClient] = useState<ClientProfile | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [dealProbability, setDealProbability] = useState<number>(50);
  const [freelancerHappiness, setFreelancerHappiness] = useState<number>(80);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'client' | 'player', text: string, feedback?: string }>>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const resetSimulator = () => {
    setSelectedClient(null);
    setCurrentStepIndex(0);
    setDealProbability(50);
    setFreelancerHappiness(80);
    setChatHistory([]);
    setIsGameOver(false);
  };

  const startSimulator = (client: ClientProfile) => {
    setSelectedClient(client);
    setCurrentStepIndex(0);
    setDealProbability(50);
    setFreelancerHappiness(80);
    setIsGameOver(false);
    setChatHistory([
      {
        sender: 'client',
        text: client.steps[0].clientMessage
      }
    ]);
  };

  const handleSelectOption = (option: DialogOption) => {
    if (!selectedClient) return;

    // Update metrik
    const newDeal = Math.max(0, Math.min(100, dealProbability + option.effect.deal));
    const newHappiness = Math.max(0, Math.min(100, freelancerHappiness + option.effect.happiness));
    setDealProbability(newDeal);
    setFreelancerHappiness(newHappiness);

    // Tambah respon ke riwayat chat
    const updatedHistory = [
      ...chatHistory,
      {
        sender: 'player' as const,
        text: option.text,
        feedback: option.feedback
      }
    ];

    const nextStepIndex = currentStepIndex + 1;
    if (nextStepIndex < selectedClient.steps.length) {
      // Lanjut ke chat langkah berikutnya
      setCurrentStepIndex(nextStepIndex);
      setChatHistory([
        ...updatedHistory,
        {
          sender: 'client' as const,
          text: selectedClient.steps[nextStepIndex].clientMessage
        }
      ]);
    } else {
      // Simulasi selesai
      setIsGameOver(true);
      setChatHistory(updatedHistory);
    }
  };

  const getFinalVerdict = () => {
    if (dealProbability >= 70 && freelancerHappiness >= 60) {
      return {
        title: "🏆 Negosiator Profesional Handal",
        description: "Selamat! Anda luar biasa dalam berkomunikasi. Anda berhasil memenangkan kesepakatan harga dengan klien secara menguntungkan tanpa mengorbankan harga diri dan kesehatan kerja Anda sebagai developer. Karir Anda akan cemerlang!",
        color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      };
    } else if (dealProbability >= 70 && freelancerHappiness < 60) {
      return {
        title: "🥵 Developer Kerja Rodi (Burnout Alert)",
        description: "Kesepakatan tercapai, tetapi dengan biaya kesehatan mental yang sangat besar. Anda cenderung mengorbankan batas waktu pribadi Anda, menerima fitur-fitur berlebihan, atau memotong harga jasa terlalu drastis demi menyenangkan klien. Belajarlah berkata tidak secara sopan!",
        color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"
      };
    } else if (dealProbability < 70 && freelancerHappiness >= 70) {
      return {
        title: "🦅 Ego Terlalu Tinggi (No Deal)",
        description: "Anda memiliki prinsip kerja yang kuat, tetapi cara berkomunikasi Anda terlalu defensif, kaku, atau agresif bagi klien. Ingatlah bahwa klien tidak memahami teknis; mereka membutuhkan rekan bisnis yang mengayomi dan memberikan solusi alternatif secara diplomatis.",
        color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
      };
    } else {
      return {
        title: "💥 Kegagalan Negosiasi Total",
        description: "Anda gagal mengamankan kesepakatan dan Anda merasa sangat stres. Anda terjebak dalam respon yang agresif atau malah menyerah total pada ekspektasi tak masuk akal dari klien rewel. Bacalah tab modul panduan karir di atas, lalu coba simulator ini sekali lagi untuk melatih intuisi negosiasi bisnis Anda!",
        color: "text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20"
      };
    }
  };

  // ==========================================
  // DAFTAR TAB MATERI
  // ==========================================
  const tabs: TabContent[] = [
    {
      id: 'roadmap',
      title: 'Peta Jalan Karir',
      icon: <Compass className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <h3 className="text-xl font-bold text-black dark:text-white">5 Langkah Menghasilkan Uang Setelah Belajar Koding</h3>
            <p className="text-xs text-black/50 dark:text-white/50 mt-0.5">Panduan alur perjalanan junior developer dari nol sampai menerima transferan DP pertama.</p>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">1</div>
              <h4 className="font-bold text-black dark:text-white text-sm">Aturan Emas 3 Proyek Magnet</h4>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                Jangan menumpuk puluhan aplikasi to-do list hasil tutorial. Buat 3 website nyata: Landing page bisnis riil teroptimasi, dashboard dinamis dengan API eksternal, dan redesign (Sebelum & Sesudah) website lokal yang jadul.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">2</div>
              <h4 className="font-bold text-black dark:text-white text-sm">Deploy Kecepatan Tinggi (Cloudflare)</h4>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                Deploy portofolio Anda di Cloudflare Pages agar bisa diakses kencang oleh calon klien. Gunakan domain kustom berbayar (.com / .id) untuk meningkatkan kepercayaan calon klien hingga 10 kali lipat.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">3</div>
              <h4 className="font-bold text-black dark:text-white text-sm">Proposal Bid Berbasis Solusi Bisnis</h4>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                Hindari surat lamaran template copy-paste. Terapkan formula 4 Paragraf Emas: Buka dengan hook analisis masalah spesifik klien, tawarkan solusi bernilai tambah, lampirkan link demo proyek relevan, dan ajak telpon diskusi gratis.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">4</div>
              <h4 className="font-bold text-black dark:text-white text-sm">Metode Gerilya Peta Lokal (Google Maps)</h4>
              <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                Metode paling efektif mencari klien lokal: Cari UMKM di Google Maps yang belum punya website atau websitenya lambat. Kontak media sosial mereka dengan menawarkan bantuan digitalisasi bisnis secara terhormat dan ramah.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-emerald-500/30 bg-emerald-500/5 flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">Pemberitahuan Karir Junior</h5>
              <p className="text-xs text-emerald-800/80 dark:text-emerald-300/80 leading-relaxed">
                Jangan ragu melamar karena merasa "baru belajar". Klien di dunia nyata tidak memikirkan berapa tahun Anda kuliah koding, mereka hanya butuh seseorang yang peduli pada pertumbuhan bisnis mereka dan bisa merampungkan proyek tepat waktu.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'proposal',
      title: 'Template Proposal',
      icon: <Award className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <h3 className="text-xl font-bold text-black dark:text-white">Galeri Template Proposal Siap Salin</h3>
            <p className="text-xs text-black/50 dark:text-white/50 mt-0.5">Pilih template yang paling cocok untuk tipe prospek klien Anda, lalu salin kodenya secara instan.</p>
          </div>

          {/* Sub-selector Template */}
          <div className="flex flex-wrap gap-2 p-1 rounded-xl bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/5">
            {[
              { id: 'ukm', label: 'Landing Page Jasa' },
              { id: 'redesign', label: 'Gerilya Redesign' },
              { id: 'ecommerce', label: 'Toko Online WA' },
              { id: 'company', label: 'Company Profile' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveProposalTemplate(t.id)}
                className={`p-2 px-3 text-[11px] font-bold rounded-lg transition-all ${
                  activeProposalTemplate === t.id
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {activeProposalTemplate === 'ukm' && (
              <div className="space-y-4">
                <h4 className="font-bold text-black dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Template 1: Website Landing Page Jasa UKM (Catering, Laundry, dll)
                </h4>
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-xs text-black/80 dark:text-white/80 whitespace-pre-wrap leading-relaxed select-all cursor-pointer" title="Klik untuk menyeleksi semua teks">
{`Halo Kak! 

Saya melihat Anda sedang membutuhkan website Landing Page premium untuk bisnis [Catering Diet Sehat / Klinik Hewan / Laundry] Anda agar pemesanan produk dan pengaturan konsultasi customer tidak berantakan di WhatsApp.

Saya telah menganalisis deskripsi proyek Anda. Agar calon pelanggan Anda tidak kebingungan saat memilih paket layanan, sebaiknya kita pajang 3 menu andalan terlaris di bagian atas dengan tombol pemesanan WhatsApp yang langsung mencantumkan format pemesanan otomatis. Saya juga akan memastikan website dimuat kurang dari 2 detik di HP pelanggan agar mereka tidak kabur akibat loading lambat.

Sebagai bukti nyata, saya baru saja menyelesaikan proyek landing page serupa dengan performa cepat. Anda bisa mencoba demo websitenya langsung di sini:
👉 Demo Web: [Tautan Link Demo Portofolio Anda]
👉 Kode Sumber GitHub: [Tautan Repositori GitHub Anda]

Apakah Kakak ada waktu luang sekitar 5-10 menit besok untuk sekadar berdiskusi via chat atau telepon? Saya sudah menyiapkan rancangan sketsa tata letak awal (wireframe) kasar yang mungkin cocok untuk bisnis Kakak. Mari kita diskusikan ini secara santai tanpa kewajiban komitmen apa pun di awal. 

Terima kasih banyak, ditunggu kabar baiknya!

Salam hangat,
[Nama Anda]`}
                </div>
                
                <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-2">
                  <h5 className="font-bold text-black dark:text-white text-xs">Kapan Harus Menggunakan Ini?</h5>
                  <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                    Gunakan template ini untuk melamar proyek yang dipasang di platform freelance (Upwork, Projects.co.id, Fastwork) untuk jenis bisnis jasa lokal yang butuh konversi leads instan ke WhatsApp.
                  </p>
                </div>
              </div>
            )}

            {activeProposalTemplate === 'redesign' && (
              <div className="space-y-4">
                <h4 className="font-bold text-black dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Template 2: Proposal Gerilya Redesign (Taktik Kontak Peta Google Maps)
                </h4>
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-xs text-black/80 dark:text-white/80 whitespace-pre-wrap leading-relaxed select-all cursor-pointer" title="Klik untuk menyeleksi semua teks">
{`Halo Kak [Nama Owner / Admin Bisnis]! 

Saya Ayick, seorang Web Developer lokal. Saya adalah salah satu pelanggan setia dari [Nama Bisnis, contoh: Kafe Kopi Sedap / Toko Roti Lezat]. Saya sangat menyukai produk Anda!

Kemarin saat saya ingin memesan menu terbaru lewat website Anda di HP, saya menyadari websitenya membutuhkan waktu sekitar 7 detik untuk terbuka, dan beberapa gambar menu tampak terpotong di layar mobile. Hal ini cukup disayangkan karena bisa membuat calon pelanggan lain mengurungkan niat memesan akibat loading yang lama.

Sebagai bentuk apresiasi saya terhadap brand Anda, saya berinisiatif membuat draf redesign konsep website baru yang jauh lebih modern, mobile-responsif, dan teroptimasi super cepat (dimuat kurang dari 1.5 detik menggunakan server Cloudflare Pages). 

Anda bisa melihat perbandingan draf konsep redesign buatan saya di sini:
👉 Konsep Baru (Demo Web): [Tautan Link Demo Portofolio Anda]

Jika Kakak tertarik, saya ingin menawarkan jasa pengerjaan redesign website lengkap ini dengan penawaran khusus pemilik bisnis lokal. Apakah kita bisa mengobrol santai 5 menit minggu ini melalui WhatsApp? 

Terima kasih banyak atas waktunya, dan sukses terus untuk bisnis [Nama Bisnis]!

Salam sukses,
[Nama Anda]`}
                </div>
                
                <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-2">
                  <h5 className="font-bold text-black dark:text-white text-xs">Kapan Harus Menggunakan Ini?</h5>
                  <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                    Sangat cocok untuk strategi <strong>"Cold Pitching"</strong>. Temukan UMKM di wilayah Anda menggunakan Google Maps, cari yang websitenya lambat/jadul, lalu hubungi mereka via DM Instagram, email, atau kontak WhatsApp bisnis mereka dengan penawaran solutif ini.
                  </p>
                </div>
              </div>
            )}

            {activeProposalTemplate === 'ecommerce' && (
              <div className="space-y-4">
                <h4 className="font-bold text-black dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Template 3: E-Commerce Toko Online WhatsApp (UMKM Retail & Barang)
                </h4>
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-xs text-black/80 dark:text-white/80 whitespace-pre-wrap leading-relaxed select-all cursor-pointer" title="Klik untuk menyeleksi semua teks">
{`Halo Kak!

Saya membaca lowongan proyek Anda yang membutuhkan website Toko Online. Saya sangat bersemangat menawarkan solusi praktis untuk mendongkrak penjualan produk [Nama Produk, contoh: Fashion / Sepatu / Makanan] Anda.

Untuk budget UMKM, membangun sistem e-commerce full-custom yang rumit seringkali terlalu mahal dan melelahkan untuk dikelola. Solusi terbaik yang saya tawarkan adalah membangun Toko Online semi-otomatis:
1. Katalog produk estetik yang super cepat diakses dari HP.
2. Fitur "Add to Cart" (Keranjang Belanja) tanpa login yang mudah digunakan pembeli.
3. Tombol Checkout yang langsung mengirimkan ringkasan total belanjaan, ongkir, dan alamat pembeli ke WhatsApp admin Anda dalam satu kali klik.

Ini memangkas biaya server bulanan Anda hingga 90% namun tetap memberikan pengalaman belanja profesional layaknya marketplace besar.

Silakan cek demo toko online WhatsApp siap pakai yang telah saya bangun sebelumnya:
👉 Demo Toko Online: [Tautan Link Demo Portofolio Anda]
👉 Repositori Kode: [Tautan Repositori GitHub Anda]

Mari kita diskusikan fitur apa saja yang paling krusial untuk peluncuran perdana produk Kakak via telepon 5 menit besok. Terima kasih!

Salam hangat,
[Nama Anda]`}
                </div>
                
                <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-2">
                  <h5 className="font-bold text-black dark:text-white text-xs">Kapan Harus Menggunakan Ini?</h5>
                  <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                    Gunakan saat prospek klien Anda menjual barang fisik (fashion, herbal, makanan ringan) tetapi memiliki budget terbatas (dibawah 3 juta). Website checkout WhatsApp adalah solusi termudah tanpa pusing mengurus gateway pembayaran bank yang mahal di awal.
                  </p>
                </div>
              </div>
            )}

            {activeProposalTemplate === 'company' && (
              <div className="space-y-4">
                <h4 className="font-bold text-black dark:text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Template 4: Company Profile Korporat Resmi & Profesional (B2B)
                </h4>
                <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 font-mono text-xs text-black/80 dark:text-white/80 whitespace-pre-wrap leading-relaxed select-all cursor-pointer" title="Klik untuk menyeleksi semua teks">
{`Selamat pagi/siang Bapak/Ibu [Nama Penerima / Jabatan],

Perkenalkan saya [Nama Anda], profesional Web Developer. Saya menghubungi Anda setelah melihat rencana pengembangan digitalisasi brand perusahaan Bapak/Ibu di [Nama Platform / LinkedIn].

Di era digital saat ini, website Company Profile adalah wajah pertama kredibilitas perusahaan di hadapan investor dan klien B2B. Berdasarkan riset saya terhadap sektor industri [Nama Industri, contoh: Kontraktor / Konsultan / Logistik], website Company Profile yang sukses wajib memiliki 3 pilar: kredibilitas layanan yang transparan, galeri portofolio proyek/klien terdahulu yang rapi, dan halaman kontak interaktif yang terintegrasi dengan peta kantor lokal.

Saya menawarkan jasa pembuatan website Company Profile premium dengan arsitektur modern (React & TailwindCSS) yang menjamin performa SEO maksimal di Google, keamanan SSL bersertifikasi, dan kemudahan bagi tim internal Bapak/Ibu untuk memperbarui konten kapan saja.

Berikut portofolio resmi Company Profile korporat yang pernah saya kerjakan sebelumnya:
👉 Link Portofolio: [Tautan Link Demo Portofolio Anda]
👉 Resume & Profil Profesional Saya: [Tautan Profil LinkedIn/Portfolio Anda]

Saya sangat menghargai kesempatan untuk mengirimkan draf proposal penawaran teknis formal (PDF) beserta rincian estimasi biaya (RAB) ke email perusahaan Anda. Apakah ada alamat email resmi yang bisa saya tuju?

Terima kasih atas waktu dan perhatian Bapak/Ibu.

Hormat saya,
[Nama Anda]
[Nomor Kontak / WhatsApp]`}
                </div>
                
                <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-2">
                  <h5 className="font-bold text-black dark:text-white text-xs">Kapan Harus Menggunakan Ini?</h5>
                  <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                    Gunakan untuk menyasar perusahaan tingkat menengah (Perseroan Terbatas / B2B) yang membutuhkan profil digital resmi berkelas tinggi untuk keperluan tender, audit, atau branding profesional. Nada bahasanya wajib menggunakan format formal (formal Indonesian).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'pricing',
      title: 'Strategi Pricing',
      icon: <Coins className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <h3 className="text-xl font-bold text-black dark:text-white">Menghitung Tarif Tanpa Minder & Boncos</h3>
            <p className="text-xs text-black/50 dark:text-white/50 mt-0.5">Rumus matematika terpercaya menentukan harga minimal demi menghindari kerja rodi berujung stres.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-1">
              <h4 className="font-semibold text-black/50 dark:text-white/50 text-xs uppercase">Batas Minimum Bulanan</h4>
              <p className="text-xl font-black text-black dark:text-white">Rp 4.000.000</p>
              <p className="text-[10px] text-black/40 dark:text-white/40">Biaya hidup + internet + alat operasional.</p>
            </div>
            
            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-1">
              <h4 className="font-semibold text-black/50 dark:text-white/50 text-xs uppercase">Target Jam Kerja Produktif</h4>
              <p className="text-xl font-black text-black dark:text-white">80 Jam / Bulan</p>
              <p className="text-[10px] text-black/40 dark:text-white/40">Sekitar 4 jam per hari di luar marketing & istirahat.</p>
            </div>

            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-1">
              <h4 className="font-semibold text-black/50 dark:text-white/50 text-xs uppercase">Tarif Per Jam Minimal (MAR)</h4>
              <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">Rp 50.000</p>
              <p className="text-[10px] text-black/40 dark:text-white/40">Tarif minimal agar bisnis Anda bertahan sehat.</p>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 space-y-4">
            <h4 className="font-bold text-black dark:text-white text-sm">Menghitung Harga Landing Page 1 Halaman</h4>
            <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
              Jika Anda memperkirakan pengerjaan website landing page UKM membutuhkan waktu sekitar <strong>40 jam kerja</strong> (termasuk riset desain, koding, revisi, dan deploy ke Cloudflare), maka batas terendah penawaran harga Anda adalah:
            </p>
            <div className="p-3 rounded-lg bg-black/10 dark:bg-white/10 text-center font-mono font-bold text-sm text-black dark:text-white">
              Rp 50.000 (Tarif Minimal) x 40 Jam Kerja = Rp 2.000.000
            </div>
            <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed italic">
              *Taktik Karir: Jika klien menawar di bawah Rp 2.000.000, tawarkan metode pengurangan fitur (Scope Reduction). Jangan potong harga Anda secara cuma-cuma tanpa menuntut pengurangan beban pengerjaan!
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'secure',
      title: 'Pengamanan Pembayaran',
      icon: <Target className="w-4 h-4" />,
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <h3 className="text-xl font-bold text-black dark:text-white">Prinsip Keamanan Pembayaran Proyek</h3>
            <p className="text-xs text-black/50 dark:text-white/50 mt-0.5">Hindari penipuan klien nakal dengan menerapkan mekanisme DP wajar wajar dan proteksi demo server.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm flex-shrink-0">A</div>
              <div className="space-y-1">
                <h4 className="font-bold text-black dark:text-white text-sm">Wajib DP 50% Sebelum Mulai Bekerja</h4>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                  Jangan pernah menulis kode sebaris pun sebelum uang muka 50% masuk ke rekening Anda. Klien yang profesional tidak akan keberatan membayar uang muka sebagai bukti komitmen kerja sama bisnis.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm flex-shrink-0">B</div>
              <div className="space-y-1">
                <h4 className="font-bold text-black dark:text-white text-sm">Simpan Aset di Server Demo Pribadi</h4>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                  Selama masa pengerjaan dan uji coba oleh klien, pasang website di hosting demo milik Anda sendiri (misal: di akun subdomain Cloudflare gratisan Anda). Jangan pernah mengunggah file zip kode asli atau memindahkan hosting ke domain utama akun klien sebelum pelunasan dibayar.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm flex-shrink-0">C</div>
              <div className="space-y-1">
                <h4 className="font-bold text-black dark:text-white text-sm">Batasi Jumlah Hak Revisi di Awal (Maksimal 3 Kali)</h4>
                <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed">
                  Tuliskan di pesan email/kesepakatan awal secara tegas: "Harga mencakup desain utama dan maksimal 3 kali revisi minor selama masa pengerjaan. Setelah website diserahterimakan, revisi baru akan dikenakan biaya tambahan." Ini menghemat waktu Anda dari perubahan tanpa akhir.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'game',
      title: '🎮 Simulator Negosiasi',
      icon: <Sparkles className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
      content: (
        <div className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <h3 className="text-xl font-bold text-black dark:text-white">Latih Kemampuan Komunikasi Anda</h3>
            <p className="text-xs text-black/50 dark:text-white/50 mt-0.5">Pilih salah satu tipe klien virtual di bawah ini, lalu lakukan negosiasi chat interaktif untuk mengamankan deal terbaik!</p>
          </div>

          <AnimatePresence mode="wait">
            {!selectedClient ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <div className="grid gap-4 md:grid-cols-3">
                  {CLIENTS.map((client) => (
                    <div 
                      key={client.id}
                      className="p-5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 flex flex-col justify-between space-y-4"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${client.avatarBg}`}>
                            {client.avatarText}
                          </div>
                          <div>
                            <h4 className="font-bold text-black dark:text-white text-sm">{client.name}</h4>
                            <p className="text-[10px] text-black/40 dark:text-white/40">{client.role}</p>
                          </div>
                        </div>

                        <div className="space-y-1 pt-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-black/40 dark:text-white/40">Budget:</span>
                            <span className="font-bold text-black dark:text-white">{client.budget}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-black/40 dark:text-white/40">Tingkat Kesulitan:</span>
                            <span className={`font-semibold ${
                              client.difficulty === 'Mudah' ? 'text-green-500' :
                              client.difficulty === 'Sedang' ? 'text-indigo-500' : 'text-red-500'
                            }`}>{client.difficulty}</span>
                          </div>
                        </div>

                        <p className="text-xs text-black/60 dark:text-white/60 leading-relaxed pt-2">
                          {client.description}
                        </p>
                      </div>

                      <button 
                        onClick={() => startSimulator(client)}
                        className="w-full py-2 bg-emerald-500 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10"
                      >
                        Mulai Obrolan <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Header Simulator Negosiasi */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${selectedClient.avatarBg}`}>
                      {selectedClient.avatarText}
                    </div>
                    <div>
                      <h4 className="font-bold text-black dark:text-white text-sm">Negosiasi: {selectedClient.name}</h4>
                      <p className="text-[10px] text-black/40 dark:text-white/40">{selectedClient.role}</p>
                    </div>
                  </div>

                  {/* Status Metrik Real-Time */}
                  <div className="flex gap-4">
                    <div className="p-2 px-3 rounded-lg bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/5 flex flex-col items-center min-w-[100px]">
                      <span className="text-[10px] text-black/40 dark:text-white/40">Deal Prob. 🤝</span>
                      <span className={`text-base font-black ${
                        dealProbability >= 70 ? 'text-green-500' :
                        dealProbability >= 40 ? 'text-indigo-500' : 'text-red-500'
                      }`}>{dealProbability}%</span>
                    </div>

                    <div className="p-2 px-3 rounded-lg bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/5 flex flex-col items-center min-w-[100px]">
                      <span className="text-[10px] text-black/40 dark:text-white/40">Kebahagiaan 😊</span>
                      <span className={`text-base font-black ${
                        freelancerHappiness >= 75 ? 'text-green-500' :
                        freelancerHappiness >= 50 ? 'text-indigo-500' : 'text-red-500'
                      }`}>{freelancerHappiness}%</span>
                    </div>
                  </div>
                </div>

                {/* Viewport Chat History */}
                <div className="border border-black/10 dark:border-white/10 rounded-xl bg-black/5 dark:bg-white/5 overflow-hidden flex flex-col max-h-[400px]">
                  <div className="p-4 space-y-4 overflow-y-auto flex-1 min-h-[250px] max-h-[350px]">
                    {chatHistory.map((chat, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className={`flex ${chat.sender === 'player' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                            chat.sender === 'player' 
                              ? 'bg-emerald-500 text-white rounded-tr-none' 
                              : 'bg-black/10 dark:bg-white/10 text-black dark:text-white rounded-tl-none border border-black/5 dark:border-white/5'
                          }`}>
                            <p className="font-semibold text-[10px] opacity-60 mb-1">
                              {chat.sender === 'player' ? 'Anda (Junior Developer)' : selectedClient.name}
                            </p>
                            {chat.text}
                          </div>
                        </div>

                        {chat.feedback && (
                          <div className="flex justify-end pr-2">
                            <div className="max-w-[80%] p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-[11px] leading-relaxed flex gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                              <p><strong>Umpan Balik:</strong> {chat.feedback}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bagian Input / Pilihan Dialog */}
                {!isGameOver ? (
                  <div className="space-y-3">
                    <p className="text-[10px] text-black/40 dark:text-white/40 uppercase font-semibold tracking-wider">Pilih Opsi Dialog Balasan Anda:</p>
                    <div className="grid gap-3">
                      {selectedClient.steps[currentStepIndex].options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(opt)}
                          className="w-full text-left p-3.5 rounded-xl border border-black/10 dark:border-white/10 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-500/5 dark:hover:bg-emerald-500/10 transition-all text-xs text-black dark:text-white flex items-start gap-3 bg-black/5 dark:bg-white/5 group"
                        >
                          <span className="w-5 h-5 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center font-bold text-[10px] flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{opt.text}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`p-5 rounded-xl border ${getFinalVerdict().color} space-y-4`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-500" />
                      <h4 className="font-extrabold text-sm">{getFinalVerdict().title}</h4>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">
                      {getFinalVerdict().description}
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={resetSimulator}
                        className="py-2.5 px-4 bg-emerald-500 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Pilih Klien Lain
                      </button>
                      
                      <button
                        onClick={() => startSimulator(selectedClient)}
                        className="py-2.5 px-4 bg-black/10 dark:bg-white/10 text-black dark:text-white border border-black/10 dark:border-white/10 rounded-lg text-xs font-bold hover:bg-black/20 dark:hover:bg-white/20 transition-colors flex items-center justify-center gap-1.5"
                      >
                        Ulangi Klien Ini
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10">
      {/* HEADER UTAMA */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-500">Materi Bonus Karir</span>
            <h1 className="text-2xl md:text-3xl font-black text-black dark:text-white tracking-tight leading-tight">
              Dapatkan Proyek Pertama (Cuan Setelah Belajar)
            </h1>
          </div>
        </div>

        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed border-l-4 border-emerald-500 pl-4 bg-emerald-500/5 dark:bg-emerald-500/10 p-3 rounded-r-xl">
          Selamat! Anda telah menguasai dasar pemrograman web. Sekarang saatnya memahami taktik karir, menyusun portofolio magnetik, membuat template proposal penawaran terakreditasi, dan belajar menegosiasikan harga proyek koding langsung di lapangan!
        </p>
      </div>

      {/* DESAIN NAVIGASI TAB EMERALD */}
      <div className="flex flex-wrap gap-2 border-b border-black/10 dark:border-white/10 pb-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 p-2.5 px-4 text-xs font-bold rounded-xl transition-all border ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-md shadow-emerald-500/15'
                : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 border-transparent hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            {tab.icon}
            {tab.title}
          </button>
        ))}
      </div>

      {/* KONTEN TAB */}
      <div className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 shadow-inner"
          >
            {tabs.find((t) => t.id === activeTab)?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FirstProjectBonus;
