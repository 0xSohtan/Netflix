import Head from "next/head";
import Link from "next/link";
import registerStyles from '@/styles/Register.module.css';
import React, { useState } from 'react';
import { useRouter } from "next/router";
import firebase from '@/utils/firebase';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');

    const router = useRouter();

    const handleRegister = async (event) => {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars

        if (password !== confirmPassword) {
            toast.error('Passwörter stimmen nicht überein!');
            return;
        }

        const auth = getAuth(firebase);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Aktualisieren Sie den Benutzernamen im Benutzerprofil
            await updateProfile(user, {
                displayName: username
            });

            // Senden Sie die Bestätigungs-E-Mail
            await sendEmailVerification(user);

            toast.success('Bitte Bestätigen Sie ihre Email!');
            setTimeout(() => {
                router.push('/login');
            }, 3000);
        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
            toast.error('Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.');
        }
    };

    return (
        <>
            <Head>
                <title>Registrieren | Netflix</title>
                <meta name="description" content="Werden Sie noch heute Mitglied bei Netflix und entdecken Sie eine riesige Auswahl an Filmen, Serien und Dokumentationen. Der Spaß beginnt hier!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className={registerStyles.pageBody}>
                <div className={registerStyles.form_wrapper}>
                    <h2>Registrieren</h2>
                    <form onSubmit={handleRegister}>
                        <div className={registerStyles.form_control}>
                            <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Benutzername" />
                            <label>Benutzername</label>
                        </div>
                        <div className={registerStyles.form_control}>
                            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-Mail" />
                            <label>Email</label>
                        </div>
                        <div className={registerStyles.form_control}>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Passwort" />
                            <label>Passwort</label>
                        </div>
                        <div className={registerStyles.form_control}>
                            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Passwort bestätigen" />
                            <label>Passwort bestätigen</label>
                        </div>
                        <button type="submit">Registrieren</button>
                    </form>
                    <p style={{ color: '#b3b3b3' }}>Haben Sie ein Account? <Link href="/login" style={{ color: '#fff' }}>Hier Anmelden.</Link></p>
                </div>
            </div>
            <Toaster />
        </>
    )
}
