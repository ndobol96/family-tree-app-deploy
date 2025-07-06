// src/firebase.js import { initializeApp } from 'firebase/app'; import { getAuth } from 'firebase/auth'; import { getFirestore } from 'firebase/firestore'; import { getStorage } from 'firebase/storage';

const firebaseConfig = { apiKey: import.meta.env.VITE_FIREBASE_API_KEY, authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID, storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, appId: import.meta.env.VITE_FIREBASE_APP_ID, measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID };

export const app = initializeApp(firebaseConfig); export const auth = getAuth(app); export const db = getFirestore(app); export const storage = getStorage(app);

// src/main.jsx import React from 'react'; import ReactDOM from 'react-dom/client'; import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render( <React.StrictMode> <App /> </React.StrictMode> );

// src/App.jsx import { useState, useEffect, useRef } from 'react'; import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'; import { auth, db, storage } from './firebase'; import { collection, addDoc, getDocs, Timestamp, serverTimestamp } from 'firebase/firestore'; import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; import html2canvas from 'html2canvas'; import jsPDF from 'jspdf';

function calculateAge(birthDate) { const birth = new Date(birthDate); const now = new Date(); let age = now.getFullYear() - birth.getFullYear(); const m = now.getMonth() - birth.getMonth(); if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) { age--; } return age; }

function App() { const [user, setUser] = useState(null); const [members, setMembers] = useState([]); const [form, setForm] = useState({ name: '', birthDate: '', relation: '', photo: null }); const [searchTerm, setSearchTerm] = useState(''); const [bgImage, setBgImage] = useState(''); const treeRef = useRef();

useEffect(() => { const unsubscribe = auth.onAuthStateChanged(setUser); return () => unsubscribe(); }, []);

useEffect(() => { if (user) fetchMembers(); }, [user]);

const fetchMembers = async () => { const querySnapshot = await getDocs(collection(db, 'members')); const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); setMembers(data); };

const handleLogin = async () => { const provider = new GoogleAuthProvider(); try { const result = await signInWithPopup(auth, provider); setUser(result.user); } catch (err) { console.error('Login gagal:', err); } };

const handleLogout = () => { signOut(auth); };

const handleChange = (e) => { const { name, value, files } = e.target; if (name === 'photo') { setForm({ ...form, photo: files[0] }); } else { setForm({ ...form, [name]: value }); } };

const handleSubmit = async (e) => { e.preventDefault(); let photoURL = ''; if (form.photo) { const storageRef = ref(storage, photos/${Date.now()}_${form.photo.name}); await uploadBytes(storageRef, form.photo); photoURL = await getDownloadURL(storageRef); } await addDoc(collection(db, 'members'), { name: form.name, birthDate: form.birthDate, relation: form.relation, photoURL, createdAt: serverTimestamp() }); setForm({ name: '', birthDate: '', relation: '', photo: null }); fetchMembers(); };

const exportPDF = async () => { const canvas = await html2canvas(treeRef.current); const imgData = canvas.toDataURL('image/png'); const pdf = new jsPDF(); pdf.addImage(imgData, 'PNG', 10, 10, 190, 0); pdf.save('silsilah-keluarga.pdf'); };

const filteredMembers = members.filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()) );

return ( <div style={{ padding: '2rem', fontFamily: 'sans-serif', backgroundImage: url(${bgImage}), backgroundSize: 'cover', minHeight: '100vh' }}> <h1>Family Tree App</h1> {!user ? ( <button onClick={handleLogin}>Login dengan Google</button> ) : ( <div> <p>Halo, {user.displayName}</p> <img src={user.photoURL} alt="avatar" width={50} style={{ borderRadius: '50%' }} /> <button onClick={handleLogout}>Logout</button>

<h2>Ubah Background</h2>
      <input type="text" placeholder="Link gambar background" onBlur={(e) => setBgImage(e.target.value)} />

      <h2>Tambah Anggota Keluarga</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nama" value={form.name} onChange={handleChange} required />
        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} required />
        <input type="text" name="relation" placeholder="Hubungan" value={form.relation} onChange={handleChange} required />
        <input type="file" name="photo" accept="image/*" onChange={handleChange} />
        <button type="submit">Simpan</button>
      </form>

      <h3>Cari Anggota</h3>
      <input type="text" placeholder="Cari nama..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <h3>Bagan Keluarga</h3>
      <div ref={treeRef} style={{ padding: '1rem', backgroundColor: 'rgba(255,255,255,0.8)' }}>
        <ul>
          {filteredMembers.map((m) => (
            <li key={m.id} style={{ marginBottom: '1rem' }}>
              {m.photoURL && <img src={m.photoURL} alt={m.name} width={50} style={{ borderRadius: '5px', marginRight: 10 }} />}
              <strong>{m.name}</strong> ({m.relation}) - Lahir: {m.birthDate} - Usia: {calculateAge(m.birthDate)} tahun
            </li>
          ))}
        </ul>
      </div>
      <button onClick={exportPDF}>Export PDF</button>
    </div>
  )}
</div>

); }

export default App;