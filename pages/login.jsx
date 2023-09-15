import Head from "next/head"
import Link from "next/link";
import loginStyles from '@/styles/Login.module.css'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import firebase from '@/utils/firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';


export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars

    const auth = getAuth(firebase);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user && !user.emailVerified) {
        toast.error('Bitte bestätigen Sie Ihre E-Mail-Adresse. Überprüfen Sie Ihren Posteingang oder Spam-Ordner.');
        return; // Hier beenden wir die Funktion, wenn die E-Mail nicht bestätigt wurde.
      }

      toast.success('Erfolgreich angemeldet! Sie werden weitergeleitet...');
      setTimeout(() => {
        router.push('/user/' + user.uid);
      }, 2000);
    } catch (error) {
      console.error("Fehler beim Anmelden:", error);
      toast.error('Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.');
    }
  };



  return (
    <>
      <Head>
        <title>Anmelden | Netflix</title>
        <meta name="description" content="Melden Sie sich bei Ihrem Netflix-Konto an und genießen Sie eine Welt voller Unterhaltung. Noch kein Mitglied? Registrieren Sie sich jetzt!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={loginStyles.pageBody}>
        <div className={loginStyles.form_wrapper}>
          <h2>Anmelden</h2>
          <form onSubmit={handleLogin}>
            <div className={loginStyles.form_control}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email oder Benutzername" />
              <label>Email oder Benutzername</label>
            </div>
            <div className={loginStyles.form_control}>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Passwort" />
              <label>Passwort</label>
            </div>
            <Link href="/forgot-password" style={{ color: '#fff' }}>Passwort vergessen?</Link>
            <button type="submit">Anmelden</button>
          </form>
          <p style={{ color: '#b3b3b3' }}>Neu hier? <Link href="/register" style={{ color: '#fff' }}>Hier Registrieren.</Link></p>
        </div>
      </div>
      <Toaster />
    </>
  )
}