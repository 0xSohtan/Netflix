import Head from "next/head"
import Link from "next/link";
import loginStyles from '@/styles/Login.module.css'
import React, { useState } from 'react';
import firebase from '@/utils/firebase'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';


export default function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [lastClicked, setLastClicked] = useState(null);

    const handlePasswordReset = async () => {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
        const auth = getAuth(firebase);
        try {
            await sendPasswordResetEmail(auth, email); // Verwenden Sie die E-Mail-Adresse des aktuellen Benutzers
            toast.success('E-Mail zum Zurücksetzen des Passworts wurde gesendet. Bitte überprüfen Sie Ihren Posteingang.');
        } catch (error) {
            console.error("Fehler beim Senden der Passwortzurücksetzungs-E-Mail.");
            toast.error('Fehler beim Senden der Passwortzurücksetzungs-E-Mail. Bitte versuchen Sie es erneut.');
        }
    };

    const handleButtonClick = () => {
        const now = Date.now();

        if (lastClicked && now - lastClicked < 60000) { // 60000ms = 1 Minute
            // Informieren Sie den Benutzer, dass er warten muss
            toast.error('Bitte warten Sie 1 Minute, bevor Sie erneut auf den Button klicken.');
            return;
        }

        handlePasswordReset();

        // Aktualisieren Sie den Zustand mit dem aktuellen Zeitpunkt
        setLastClicked(now);
    };


    return (
        <>
            <Head>
                <title>Passwot vergessen | Netflix</title>
                <meta name="description" content="Melden Sie sich bei Ihrem Netflix-Konto an und genießen Sie eine Welt voller Unterhaltung. Noch kein Mitglied? Registrieren Sie sich jetzt!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className={loginStyles.pageBody}>
                <div className={loginStyles.form_wrapper}>
                    <h2>Passwort vergessen</h2>
                    <form onSubmit={handleButtonClick}>
                        <div className={loginStyles.form_control}>
                            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                            <label>Email</label>
                        </div>
                        <button type="submit">Sende Email</button>
                    </form>
                    <p style={{ color: '#b3b3b3' }}>Hier <Link href="/login" style={{ color: '#fff' }}>Zurück.</Link></p>
                </div>
            </div>
            <Toaster />
        </>
    )
}