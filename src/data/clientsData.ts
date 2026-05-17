export interface DialogOption {
  text: string;
  effect: { deal: number; happiness: number };
  feedback: string;
}

export interface ChatStep {
  clientMessage: string;
  options: DialogOption[];
}

export interface ClientProfile {
  id: string;
  name: string;
  role: string;
  avatarBg: string;
  avatarText: string;
  budget: string;
  description: string;
  difficulty: 'Mudah' | 'Sedang' | 'Sulit';
  steps: ChatStep[];
}

export const CLIENTS: ClientProfile[] = [
  {
    id: 'budi',
    name: 'Pak Budi',
    role: 'Pemilik Toko Grosir Tradisional (Lowballer / Nego Sadis)',
    avatarBg: 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400',
    avatarText: 'PB',
    budget: 'Rp 500.000 (Sangat Rendah)',
    difficulty: 'Sulit',
    description: 'Tipe klien tradisional yang ingin serba lengkap, serba cepat, tetapi menawar harga di bawah batas wajar.',
    steps: [
      {
        clientMessage: 'Mas, saya mau dibikinkan website toko online grosir lengkap ya. Ada katalog produk, form pesanan otomatis ke WhatsApp, halaman admin, sama bisa bayar pakai kartu kredit. Tapi budget mepet nih, cuma ada Rp 500.000. Kan koding gitu gampang tinggal drag-and-drop aja ya?',
        options: [
          {
            text: 'Aduh Pak, budget Rp 500.000 mana dapet fitur selengkap itu! Koding itu susah Pak, butuh keahlian bertahun-tahun. Minimal Rp 5.000.000 baru saya buatkan.',
            effect: { deal: -30, happiness: 10 },
            feedback: 'Waduh! Merespon secara agresif dan menyalahkan klien akan langsung mematikan minat mereka. Klien merasa diremehkan dan ego mereka terluka.'
          },
          {
            text: 'Oh ya sudah Pak tidak apa-apa, saya buatkan semua fitur lengkap itu seharga Rp 500.000 demi portofolio pertama saya. Kapan bisa kita mulai?',
            effect: { deal: 40, happiness: -40 },
            feedback: 'Peringatan! Menerima harga terlalu murah untuk scope kerja masif akan merugikan Anda. Anda akan mengalami burnout, kehilangan motivasi, dan memperburuk standar industri freelance.'
          },
          {
            text: 'Saya sangat senang Bapak menghubungi saya. Dengan budget Rp 500.000 saya tetap bisa bantu buatkan website, namun dengan pengurangan scope fitur. Kita buat landing page katalog 1 halaman yang terintegrasi ke WhatsApp. Bagaimana Pak?',
            effect: { deal: 25, happiness: 20 },
            feedback: 'Sempurna! Strategi ini melatih ketegasan profesional. Anda menghargai budget klien tetapi menegaskan bahwa penurunan harga harus dibayar dengan pengurangan fitur (Scope Reduction).'
          }
        ]
      },
      {
        clientMessage: 'Masa dikurangi fiturnya? Toko grosir sebelah aja websitenya lengkap banget. Bisa nego dikit lah, naikin dikit fiturnya tapi harga tetep Rp 500.000 ya? Nanti saya promosiin jasa Mas ke temen-temen pengusaha saya yang lain deeh.',
        options: [
          {
            text: 'Maaf Pak, janji "nanti saya promosiin" itu seringkali tidak terbukti. Tenaga koding saya tidak bisa dibayar pakai eksposur promosi.',
            effect: { deal: -20, happiness: 15 },
            feedback: 'Benar bahwa bayaran eksposur itu jebakan, namun mengatakannya secara sarkastik akan merusak hubungan secara permanen.'
          },
          {
            text: 'Baik Pak, demi prospek proyek di masa depan dari teman-teman Bapak, saya tambahkan halaman form pemesanan WhatsApp secara gratis.',
            effect: { deal: 25, happiness: -20 },
            feedback: 'Kurang tepat. Menyerah pada janji kosong "eksposur" atau "promosi gratis" hanya akan membuat Anda dimanfaatkan tanpa batas oleh klien rewel.'
          },
          {
            text: 'Saya mengerti kebutuhan Bapak. Bagaimana jika kita ambil jalan tengah: websitenya tetap katalog 1 halaman, tapi saya bantu daftarkan toko Bapak ke Google Maps gratis agar pelanggan lebih mudah mencari toko grosir Anda di pencarian lokal?',
            effect: { deal: 30, happiness: 10 },
            feedback: 'Luar biasa! Menawarkan alternatif bernilai tinggi yang pengerjaannya mudah bagi Anda (seperti mendaftarkan Google Maps) memberikan kepuasan tambahan bagi klien tanpa mengorbankan waktu koding Anda.'
          }
        ]
      },
      {
        clientMessage: 'Wah, menarik juga didaftarkan ke Google Maps. Oke deh Mas, deal katalog WhatsApp + Google Maps seharga Rp 500.000. Tapi pengerjaannya langsung saya bayar lunas setelah websitenya kelar 100% dan sudah online ya? Tenang aja, uang saya aman kok.',
        options: [
          {
            text: 'Oh baik Pak, saya percaya sama Bapak. Saya langsung koding sekarang dan akan saya kabari jika websitenya sudah selesai.',
            effect: { deal: 30, happiness: -30 },
            feedback: 'Sangat bahaya! Mulai bekerja tanpa DP 50% di awal adalah kesalahan fatal junior developer. Klien bisa tiba-tiba membatalkan proyek di tengah jalan tanpa kompensasi apa pun.'
          },
          {
            text: 'Enak aja Pak, tidak bisa begitu! Mana ada kerja tanpa DP dulu. Bayar DP 50% sekarang juga atau proyek ini batal!',
            effect: { deal: -40, happiness: 10 },
            feedback: 'Meskipun prinsip Anda benar, cara penyampaian yang terkesan kasar dan menuduh akan menakut-nakuti klien.'
          },
          {
            text: 'Terima kasih atas kesepakatannya, Pak. Kebijakan standar profesional saya mewajibkan pembayaran uang muka (DP) sebesar 50% sebelum pengerjaan dimulai. Ini sebagai tanda komitmen kerja sama kita berdua. Begitu DP masuk, saya akan langsung buatkan draf desain awalnya besok pagi.',
            effect: { deal: 35, happiness: 20 },
            feedback: 'Luar biasa profesional! Menjelaskan aturan DP sebagai standar industri dengan bahasa yang sopan dan terstruktur membuat klien menghargai profesionalisme Anda.'
          }
        ]
      }
    ]
  },
  {
    id: 'clara',
    name: 'Mbak Clara',
    role: 'Manager Skincare Brand Lokal (Klien Profesional)',
    avatarBg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
    avatarText: 'MC',
    budget: 'Rp 4.000.000 (Sesuai Standar)',
    difficulty: 'Mudah',
    description: 'Klien korporasi/brand yang memahami teknologi, menghargai kualitas desain, memiliki budget wajar, namun menuntut profesionalisme tinggi.',
    steps: [
      {
        clientMessage: 'Halo Ayick! Kami sedang meluncurkan seri produk serum jerawat baru dan membutuhkan website Landing Page premium berdesain minimalis estetik. Website harus responsif di mobile, memiliki form leads untuk konsultasi gratis, dan loading time di bawah 2 detik. Budget kami Rp 4.000.000. Apakah Anda sanggup memenuhi standar kami?',
        options: [
          {
            text: 'Sanggup banget Mbak! Saya menguasai HTML, CSS, JavaScript, React, TailwindCSS, Cloudflare, Git, dan masih banyak lagi. Saya juga lulusan kursus pemrograman terbaik. Percayakan pada saya.',
            effect: { deal: 10, happiness: 10 },
            feedback: 'Cukup baik, tetapi terlalu fokus menumpuk istilah teknis (buzzwords) yang tidak menjelaskan solusi bisnis bagi Mbak Clara.'
          },
          {
            text: 'Halo Mbak Clara! Terima kasih telah menghubungi saya. Kebutuhan Mbak Clara untuk Landing Page serum jerawat estetik dengan fokus mobile-responsif sangat sejalan dengan keahlian saya. Saya berencana membangun websitenya menggunakan server Cloudflare Pages berkecepatan tinggi agar loading kurang dari 2 detik. Ini demo proyek serupa yang pernah saya buat: [link]',
            effect: { deal: 30, happiness: 10 },
            feedback: 'Hebat! Anda memvalidasi kebutuhan spesifik klien, menawarkan solusi teknis yang relevan (Cloudflare Pages), dan melampirkan portofolio sebagai bukti nyata.'
          },
          {
            text: 'Bisa Mbak, tapi harga segitu bisa ditawar lagi tidak? Soalnya saya masih junior baru belajar koding, takut hasilnya kurang maksimal.',
            effect: { deal: -30, happiness: -20 },
            feedback: 'Sangat buruk! Menyatakan diri Anda tidak percaya diri dan meminta diskon terhadap penawaran klien yang sudah wajar akan merusak reputasi Anda secara instan. Klien profesional ingin bekerja dengan ahli yang yakin dengan kemampuannya.'
          }
        ]
      },
      {
        clientMessage: 'Portofolionya menarik sekali, saya suka dengan desainnya yang bersih. Kami sepakat dengan budget Rp 4.000.000. Tapi bisakah pengerjaannya diselesaikan dalam waktu 3 hari? Kami ada agenda peluncuran serum minggu depan.',
        options: [
          {
            text: 'Bisa banget Mbak Clara! Saya akan begadang 24 jam penuh selama 3 hari berturut-turut untuk menyelesaikannya demi kenyamanan brand Mbak.',
            effect: { deal: 15, happiness: -30 },
            feedback: 'Menjanjikan sesuatu yang mengorbankan kesehatan Anda (begadang ekstrem) akan memicu kecerobohan koding dan eror pada website yang dikirim.'
          },
          {
            text: 'Waduh 3 hari terlalu cepat Mbak, tidak mungkin sempat. Website koding itu rumit Mbak, jangan buru-buru dong kalau mau hasilnya bagus.',
            effect: { deal: -20, happiness: 10 },
            feedback: 'Penyampaiannya terlalu defensif dan kurang solutif. Klien profesional memiliki garis tenggat waktu bisnis yang ketat.'
          },
          {
            text: 'Standar pengerjaan kualitas premium saya biasanya memakan waktu 7 hari kerja. Namun, karena ini untuk event peluncuran produk Mbak Clara, saya bersedia memprioritaskan proyek ini diselesaikan dalam 4 hari kerja dengan syarat seluruh materi teks produk, foto botol serum berkualitas tinggi, dan copy-writing disiapkan tim Mbak besok pagi. Bagaimana Mbak?',
            effect: { deal: 30, happiness: 15 },
            feedback: 'Sangat diplomatis! Anda memberikan jalan tengah (4 hari) dengan menuntut kontribusi kesiapan aset dari pihak klien. Ini memperjelas tanggung jawab bersama agar proyek rampung tepat waktu.'
          }
        ]
      },
      {
        clientMessage: 'Deal! Kami siapkan semua foto serum dan teksnya besok jam 9 pagi. Kami juga sepakat membayar DP 50% di muka. Bolehkah kami meminta hak revisi tanpa batas jika ada bagian desain yang kurang sesuai setelah peluncuran?',
        options: [
          {
            text: 'Tentu Mbak, saya berikan revisi gratis sepuasnya kapan pun Mbak butuhkan bahkan setelah websitenya sudah serah terima.',
            effect: { deal: 20, happiness: -40 },
            feedback: 'Hati-hati! Garansi revisi gratis tanpa batas adalah tiket emas menuju "neraka revisi" (Scope Creep). Klien bisa meminta perubahan tata letak radikal berbulan-bulan setelah website online tanpa membayar sepeser pun.'
          },
          {
            text: 'Revisi hanya boleh dilakukan maksimal 3 kali selama masa pengerjaan 4 hari ini, Mbak Clara. Setelah website di-deploy ke domain utama Mbak Clara, setiap permintaan perubahan desain baru akan dikenakan biaya jasa tambahan sebesar Rp 500.000 per halaman.',
            effect: { deal: 30, happiness: 20 },
            feedback: 'Luar biasa! Menetapkan batasan jumlah revisi (Scope Limiting) sejak awal secara tertulis di kontrak/SPK akan melindungi waktu kerja Anda dan mendidik klien untuk memberikan masukan secara padat dan efisien.'
          },
          {
            text: 'Jangan banyak revisi ya Mbak Clara, soalnya deadline pengerjaannya kan cuma 4 hari. Pusing nanti saya ngodingnya kalo Mbak minta ganti-ganti terus.',
            effect: { deal: -25, happiness: 10 },
            feedback: 'Penyampaian yang mengeluh dan tidak profesional akan menurunkan tingkat respek klien terhadap keahlian Anda.'
          }
        ]
      }
    ]
  },
  {
    id: 'doni',
    name: 'Kak Doni',
    role: 'Co-founder Startup Tech-Enthusiast (Klien Plin-Plan)',
    avatarBg: 'bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400',
    avatarText: 'KD',
    budget: 'Rp 2.000.000 (Sedang)',
    difficulty: 'Sedang',
    description: 'Klien muda startup yang memiliki ide-ide abstrak besar, namun bingung merumuskan fitur konkrit yang sebenarnya mereka butuhkan.',
    steps: [
      {
        clientMessage: 'Halo bro! Gw lagi bangun komunitas buat anak-anak pecinta motor kustom nih. Gw pengen bikin platform website yang ada fitur chat forum diskusi, profil member, galeri foto motor, marketplace onderdil kustom, sama peta rute touring bareng. Budget sih sekitar Rp 2.000.000. Keren kan idenya bro? Gimana bisa dibuat?',
        options: [
          {
            text: 'Wih gila keren banget idenya bro! Saya buatin semua fiturnya lengkap: marketplace, forum chat, maps rute touring, profil member cuma dengan Rp 2.000.000. Gampang kok!',
            effect: { deal: 35, happiness: -40 },
            feedback: 'Sangat berbahaya! Ide startup tersebut membutuhkan koding backend masif bernilai puluhan juta rupiah. Menyetujuinya dengan budget Rp 2.000.000 adalah jebakan kegagalan total bagi karir junior Anda.'
          },
          {
            text: 'Wah itu tidak mungkin dibuat bro dengan budget Rp 2.000.000. Itu sistemnya kompleks banget setara Tokopedia dan Facebook digabung. Cari developer senior aja bro.',
            effect: { deal: -30, happiness: 15 },
            feedback: 'Menolak mentah-mentah ide klien tanpa memberikan jalan keluar alternatif hanya akan membuat Anda kehilangan calon klien potensial.'
          },
          {
            text: 'Keren banget konsep komunitas motor kustomnya, Kak Doni! Namun, membangun seluruh fitur (marketplace, chat forum, maps) secara langsung membutuhkan infrastruktur database besar dan budget puluhan juta. Sebagai langkah awal startup Kakak, bagaimana jika kita bangun MVP (Minimum Viable Product) berupa Landing Page komunitas premium terlebih dahulu? Di sana ada galeri foto motor kustom, info event touring terdekat, dan satu formulir pendaftaran member baru.',
            effect: { deal: 25, happiness: 20 },
            feedback: 'Sangat cerdas! Taktik mengarahkan ide abstrak klien menuju konsep MVP (Minimum Viable Product) yang realistis akan menyelamatkan Anda dari kerja rodi sekaligus memberikan solusi termurah yang masuk akal bagi startup mereka.'
          }
        ]
      },
      {
        clientMessage: 'Hmm, bener juga ya bro. Landing page komunitas dulu buat ngumpulin member biar ga boncos di awal. Tapi gw pengen websitenya keliatan futuristik abis, ada animasi-animasi motor muter 3D, efek salju turun, lagu background otomatis muter pas dibuka, sama warna-warna neon ngejreng biar ga ngebosenin. Bisa kan bro?',
        options: [
          {
            text: 'Tentu bisa bro, saya buatkan semua efek animasi neon, lagu otomatis, dan salju berjatuhan biar websitenya meriah kayak pasar malam.',
            effect: { deal: 20, happiness: -20 },
            feedback: 'Kurang tepat. Menyetujuinya dengan tren desain buruk (seperti lagu otomatis terputar dan animasi pasar malam yang mengganggu aksesibilitas) akan merusak estetika portofolio Anda sendiri di masa depan.'
          },
          {
            text: 'Wah seleranya agak jadul ya bro. Animasi salju turun sama lagu otomatis muter itu udah ketinggalan jaman sejak tahun 2010. Bikin website lambat dan norak bro.',
            effect: { deal: -30, happiness: 10 },
            feedback: 'Kritik yang kelewat jujur tanpa disaring akan langsung menyinggung perasaan klien dan merusak kenyamanan kerja.'
          },
          {
            text: 'Ide visual neon futuristiknya sangat menarik, Kak Doni! Namun, dari riset pengalaman pengguna (UX) modern, memutar lagu otomatis sangat dihindari karena sering mengejutkan pembaca dan membuat mereka langsung menutup web. Animasi salju berlebih juga membuat loading di HP member jadi lambat. Bagaimana jika kita gunakan konsep desain gelap (Dark Theme) premium dengan aksen garis warna neon emerald-green yang tegas, ditambah animasi transisi halus pada teks utama saat di-scroll? Terlihat modern, bersih, dan loading-nya super cepat.',
            effect: { deal: 30, happiness: 15 },
            feedback: 'Brilian! Anda menolak ide buruk klien secara sopan menggunakan argumentasi riset UX yang objektif, lalu mengarahkan mereka ke solusi visual premium yang aman dan elegan.'
          }
        ]
      },
      {
        clientMessage: 'Wah gila, bener banget bro! Gw ga kepikiran soal UX di HP yang lambat. Konsep Dark Theme aksen neon emerald kedengarannya jauh lebih berkelas dan profesional. Gw percaya sama saran lu bro. Oke deal, websitenya MVP Landing page komunitas seharga Rp 2.000.000 ya. Besok gw langsung transfer lunas pas websitenya udah kelar.',
        options: [
          {
            text: 'Siap bro, langsung gass koding! Ga perlu DP bro santai aja sesama anak motor, nanti kabarin aja pas udah kelar.',
            effect: { deal: 25, happiness: -35 },
            feedback: 'Sangat salah! Aturan besi freelancing: jangan pernah menggratiskan uang muka (DP 50%) atas nama pertemanan atau rasa santai anak motor. Bisnis tetap bisnis!'
          },
          {
            text: 'Keren bro! Untuk memulai proyek ini, kita gunakan prosedur formal ya: Pembayaran DP sebesar 50% (Rp 1.000.000) sebelum pembuatan desain mockup, 30% setelah mockup disetujui, dan pelunasan 20% sebelum transfer kepemilikan domain utama. Saya kirimkan draf kesepakatan ringkasnya via email ya bro.',
            effect: { deal: 35, happiness: 20 },
            feedback: 'Luar biasa! Menetapkan struktur pembayaran bertahap (termyn) mendidik klien startup bahwa Anda bekerja secara terorganisir dan memiliki prosedur hukum bisnis yang matang.'
          },
          {
            text: 'Aduh bro, harus DP dulu ya? Budget startup kita kan lagi pas-pasan banget nih. Kalo bayarnya cicil 5 kali boleh ga bro?',
            effect: { deal: -20, happiness: -10 },
            feedback: 'Menawarkan opsi cicilan terlalu fleksibel untuk nominal kecil (Rp 2.000.000) hanya akan membebani Anda dalam menagih uang recehan setiap bulan.'
          }
        ]
      }
    ]
  }
];
