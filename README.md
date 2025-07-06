# family-tree-app-deploy
# Aplikasi Silsilah Keluarga – React + Firebase

## 🧩 Fitur Utama
- Login Google
- Tambah/edit anggota keluarga
- Tampilkan usia otomatis dari tanggal lahir
- Hubungan antar anggota (ayah, ibu, pasangan)
- Upload foto anggota
- Visualisasi pohon keluarga (smart view)
- Ekspor bagan ke PDF, PNG, SVG
- Pencarian anggota
- Ubah background dari galeri atau link

---

## 🚀 Cara Instalasi

### 1. Clone repositori ini & masuk ke folder
```bash
git clone https://github.com/namauser/family-tree-app.git
cd family-tree-app
```

### 2. Install dependensi
```bash
npm install
```

### 3. Buat file `.env` berdasarkan `.env.example`
```env
REACT_APP_FIREBASE_API_KEY=xxx
REACT_APP_FIREBASE_AUTH_DOMAIN=xxx
REACT_APP_FIREBASE_PROJECT_ID=xxx
REACT_APP_FIREBASE_STORAGE_BUCKET=xxx
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
REACT_APP_FIREBASE_APP_ID=xxx
```

### 4. Jalankan aplikasi secara lokal
```bash
npm start
```

---

## ☁️ Deploy ke Hosting

### ✅ Vercel (rekomendasi)
1. Buka [https://vercel.com](https://vercel.com) dan login.
2. Klik **New Project** → Import GitHub repo Anda.
3. Pada environment variables, masukkan semua variabel dari `.env`.
4. Klik **Deploy**.

### ✅ Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init
# Pilih Hosting + masukkan build folder sebagai 'build'
npm run build
firebase deploy
```

---

## 🔗 Sumber Eksternal
- [React](https://reactjs.org)
- [Firebase](https://firebase.google.com)
- [FamilyTree.js](https://balkangraph.com/OrgChartJS)

