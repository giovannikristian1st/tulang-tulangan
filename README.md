# Anatomi 206 Tulang Manusia 3D (Interactive Human Skeleton 3D)

Aplikasi web visual interaktif berbasis 3D (WebGL) untuk mempelajari seluruh **206 nama tulang tubuh manusia** menggunakan **model 3D anatomi asli manusia yang realistis** (dataset medis ilmiah BodyParts3D / AnatomyTOOL dalam format GLB). Dilengkapi navigasi hierarki & pencarian di sisi kiri, interaksi klik langsung pada model 3D dengan sorotan merah (*red highlight/border outline*), zoom kamera mulus, serta panel informasi edukasi di sisi kanan dengan pelafalan audio (*Text-to-Speech*).

Proyek ini telah dikonfigurasi dengan file `index.html` dan aset `models/skeleton.glb` di dalam folder proyek sehingga **siap langsung dipublikasikan secara otomatis melalui GitHub Pages**.

---

## Fitur Utama

1. **Mode Terang Medis (Default Light Mode) & Pengganti Tema (Toggle Switch)**
   - Desain tampilan default bernuansa laboratorium medis cerah dan bersih (*clinical slate white*).
   - Dilengkapi tombol toggle `Mode: Terang` / `Mode: Gelap` di bilah atas dengan penyimpanan preferensi otomatis (`localStorage`).

2. **Dukungan Multi-Bahasa Lengkap (IDN | ENG | 中文)**
   - Pilihan bahasa interaktif di bilah navigasi atas: **IDN** (Bahasa Indonesia), **ENG** (English), dan **中文** (Simplified Chinese).
   - Seluruh 41 kelompok tulang (mewakili 206 tulang tubuh manusia) diterjemahkan secara komprehensif (nama tulang, deskripsi fungsi medis, dan catatan edukasi klinis).
   - Pencarian cerdas multi-bahasa: Cari tulang sekaligus dalam bahasa Indonesia, Inggris, Mandarin, atau nama Latin internasional.
   - Pelafalan suara cerdas (*Text-to-Speech*) yang menyesuaikan vokal suara (`id-ID`, `en-US`, `zh-CN`) sesuai bahasa yang aktif.
   - Pilihan bahasa tersimpan secara otomatis di peramban pengguna (`localStorage`).

3. **Visual Rangka 3D Interaktif (Three.js)**
   - **Rotasi 360° Bebas (Orbit) & Kursor Otomatis Menghilang**: Putar model rangka dari berbagai sudut pandang. Saat sedang memutar/men-drag layar, kursor mouse otomatis disembunyikan (*auto-hide cursor*) dan seluruh elemen antarmuka (termasuk indeks tulang di sisi kiri) diproteksi dari klik tidak sengaja.
   - **Rotasi Otomatis Berkelanjutan (Continuous Auto-Rotate)**: Rangka tubuh 3D berputar 360° secara konsisten dan terus-menerus tanpa pernah mati/off secara otomatis, baik saat melihat keseluruhan tubuh maupun saat memfokuskan tulang tertentu. Pengguna tetap dapat memutar manual kapan saja.
   - **Reset Kamera Cepat**: Satu klik tombol untuk mengembalikan kamera ke tampilan penuh rangka manusia.

4. **Sorotan Merah Bersih Medis (Clean Red Highlight)**
   - Saat tulang diklik (langsung pada model 3D maupun lewat menu indeks di kiri), tulang tersebut akan **menyala merah (*emissive red*)** secara natural mengikuti bentuk anatomis aslinya tanpa kotak (*bounding box*) atau cincin kawat yang menghalangi pandangan.
   - Bagian rangka tubuh lainnya meredup transparan (*dimmed focus*) secara cerdas agar perhatian fokus tertuju 100% pada tulang yang sedang dipelajari.

5. **Jendela Info Melayang di Sisi Kanan (Detail Card Window)**
   - Menampilkan **Nama Tulang dalam Bahasa Indonesia**.
   - Menampilkan **Nama Ilmiah / Anatomi Latin**.
   - Badge pengelompokan (*Rangka Aksial* / *Rangka Apendikular*), nama regio, dan jumlah tulang pada orang dewasa.
   - **Tombol Lafalkan (Audio Text-to-Speech)**: Menggunakan peramban Web Speech API untuk melafalkan nama Latin dan Indonesia secara jernih.
   - **Tombol Toggle Fokuskan Pandangan (Mode Isolasi / Solo)**: Menyembunyikan seluruh tulang lain, melakukan *zoom to fit* pas seukuran layar pada tulang yang dipilih, dan mengunci poros rotasi 360° pada titik tengah tulang tersebut. Klik kembali untuk memunculkan kembali seluruh rangka tubuh.
   - **Deskripsi Fungsi**: Menjelaskan fungsi biologis dan mekanis tulang bagi tubuh.
   - **Catatan Medis & Anatomi**: Informasi edukatif ilmiah seputar karakteristik dan fungsi klinis tulang.

5. **Indeks 206 Tulang di Sisi Kiri (Hierarki & Pencarian)**
   - **Pencarian Real-Time**: Ketik nama umum atau Latin (misalnya: `femur`, `dahi`, `rusuk`, `pelvis`) untuk menemukan tulang seketika.
   - **Filter Tab Cepat**: Saring tampilan berdasarkan *Semua (206)*, *Rangka Aksial (80)*, atau *Rangka Apendikular (126)*.
   - **Akordeon per Regio**: 12 wilayah anatomi terorganisir rapi dengan lencana jumlah tulang.
   - **Dua Arah (Two-Way Sync)**: Klik di 3D otomatis membuka item di sidebar, dan klik item di sidebar otomatis memutar & memperbesar (*smooth camera lerp*) ke tulang 3D yang bersangkutan.

---

## Klasifikasi 206 Tulang Manusia

Proyek ini memuat data saintifik akurat yang mencakup seluruh 206 tulang manusia:

### I. Rangka Aksial (80 Tulang)
| No | Regio Anatomi | Nama Tulang & Nama Latin | Jumlah |
|---|---|---|---|
| 1 | Kranium / Tempurung Kepala | Dahi (*Os Frontale*), Ubun-ubun (*Os Parietale* - 2), Pelipis (*Os Temporale* - 2), Belakang Kepala (*Os Occipitale*), Baji (*Os Sphenoidale*), Tapis (*Os Ethmoidale*) | **8** |
| 2 | Wajah / Fasial | Rahang Atas (*Maxilla* - 2), Pipi (*Os Zygomaticum* - 2), Hidung (*Os Nasale* - 2), Rahang Bawah (*Mandibula*), Air Mata (*Os Lacrimale* - 2), Langit-langit (*Os Palatinum* - 2), Karang Hidung (*Concha Nasalis Inferior* - 2), Pembatas Rongga Hidung (*Vomer*) | **14** |
| 3 | Telinga Tengah / Osikula | Martil (*Malleus* - 2), Landasan (*Incus* - 2), Sanggurdi (*Stapes* - 2) | **6** |
| 4 | Leher / Hioid | Tulang Lidah (*Os Hyoideum*) | **1** |
| 5 | Kolumna Vertebralis | Ruas Leher (*Vertebrae Cervicales* C1-C7 - 7), Ruas Punggung (*Vertebrae Thoracicae* T1-T12 - 12), Ruas Pinggang (*Vertebrae Lumbales* L1-L5 - 5), Kelangkang (*Os Sacrum* - 1), Ekor (*Os Coccygis* - 1) | **26** |
| 6 | Sangkar Toraks | Tulang Dada (*Sternum* - 1), Rusuk Sejati (*Costae Verae* - 14), Rusuk Palsu (*Costae Spuriae* - 6), Rusuk Melayang (*Costae Fluctuantes* - 4) | **25** |
| **Subtotal Aksial** | | | **80 Tulang** |

---

### II. Rangka Apendikular (126 Tulang)
| No | Regio Anatomi | Nama Tulang & Nama Latin | Jumlah |
|---|---|---|---|
| 7 | Gelang Bahu / Pektoral | Selangka (*Clavicula* - 2), Belikat (*Scapula* - 2) | **4** |
| 8 | Lengan Atas & Bawah | Lengan Atas (*Humerus* - 2), Pengumpil (*Radius* - 2), Hasta (*Ulna* - 2) | **6** |
| 9 | Tangan / Manus | Karpal / Pergelangan Tangan (*Ossa Carpi* - 16), Metakarpal / Telapak Tangan (*Ossa Metacarpi* - 10), Falang / Ruas Jari Tangan (*Phalanges Manus* - 28) | **54** |
| 10 | Gelang Panggul / Pelvis | Tulang Panggul / Koksa (*Os Coxae* - 2: peleburan Ilium, Ischium, & Pubis) | **2** |
| 11 | Tungkai Bawah | Paha (*Femur* - 2), Tempurung Lutut (*Patella* - 2), Tulang Kering (*Tibia* - 2), Tulang Betis (*Fibula* - 2) | **8** |
| 12 | Kaki / Pes | Tarsal / Pangkal Kaki (*Ossa Tarsi* - 14), Metatarsal / Telapak Kaki (*Ossa Metatarsi* - 10), Falang / Ruas Jari Kaki (*Phalanges Pedis* - 28) | **52** |
| **Subtotal Apendikular** | | | **126 Tulang** |

### **Total Keseluruhan = 80 + 126 = 206 Tulang**

---

## Cara Menjalankan Secara Lokal

1. **Buka Langsung File**:
   Cukup klik dua kali file `index.html` pada peramban web modern favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. **Atau Menggunakan Live Server / Local Web Server**:
   Jika menggunakan VS Code atau terminal, jalankan:
   ```bash
   # Menggunakan Python 3:
   python -m http.server 8000
   ```
   Buka `http://localhost:8000` di peramban web Anda.

---

## 🌐 Cara Publikasi ke GitHub Pages (Otomatis & Gratis)

Karena repositori ini sudah dilengkapi file utama `index.html`, Anda dapat mengaktifkannya di GitHub dalam hitungan detik:

1. Buat repositori baru di GitHub (misal: `human-skeleton-3d`).
2. Unggah seluruh isi folder `human-skeleton-3d/` ke repositori tersebut:
   ```bash
   git init
   git add .
   git commit -m "Inisialisasi aplikasi interaktif 3D 206 tulang manusia"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/human-skeleton-3d.git
   git push -u origin main
   ```
3. Di halaman repositori GitHub:
   - Klik tab **Settings** (Pengaturan).
   - Di menu sebelah kiri, klik **Pages**.
   - Pada bagian **Build and deployment > Branch**, pilih branch `main` dan folder `/ (root)`.
   - Klik **Save**.
4. Dalam 1-2 menit, website Anda sudah aktif dan dapat diakses dari mana saja melalui URL:
   `https://USERNAME-ANDA.github.io/human-skeleton-3d/`

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

- **Model 3D Anatomi Medis**: Model tulang asli manusia (GLB ~3.4 MB) bersumber dari dataset anatomi terbuka ilmiah BodyParts3D / AnatomyTOOL, mencakup detail mikroskopis tengkorak, kolumna vertebra, toraks, ekstremitas atas, gelang panggul, hingga ekstremitas bawah.
- **Three.js (r128) & GLTFLoader**: Pustaka grafis 3D WebGL performa tinggi untuk merender model tulang dengan tekstur dan pencahayaan studio realistis.
- **OrbitControls**: Navigasi kamera 3D halus dengan redaman momentum (*inertia damping*) dan kontrol rotasi 360°/zoom responsif.
- **HTML5 & CSS3 Glassmorphism UI**: Antarmuka modern bernuansa *Dark Medical Lab*, responsif di desktop maupun layar sentuh tablet/ponsel.
- **Web Speech API**: Sintesis suara alami peramban untuk pelafalan nama Latin dan Indonesia secara otomatis.
- **Zero Build Tools**: Tanpa instalasi `npm`, `webpack`, atau framework yang rumit. Bersih, cepat, dan siap pakai.

---

*Dibuat untuk media pembelajaran interaktif sains dan kedokteran dasar.*
