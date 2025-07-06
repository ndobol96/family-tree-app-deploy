import { useState, useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from './firebase';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Family Tree App</h1>
      {user ? (
        <div>
          <p>Selamat datang, {user.displayName}</p>
          <img src={user.photoURL} alt="profile" width={50} style={{ borderRadius: '50%' }} />
        </div>
      ) : (
        <button onClick={handleLogin}>Login dengan Google</button>
      )}
    </div>
  );
}