import Head from "next/head"
import Link from "next/link";
import registerStyles from '@/styles/Register.module.css'
import React, { useState } from 'react';
import { useRouter } from "next/router";
import firebase from '@/utils/firebase'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleRegister = async (event) => {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars

        const auth = getAuth(firebase);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Weiterleitung oder andere Aktionen nach erfolgreicher Registrierung
            router.push('/login')
        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
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
                            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-Mail" />
                            <label>Email</label>
                        </div>
                        <div className={registerStyles.form_control}>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Passwort" />
                            <label>Passwort</label>
                        </div>
                        <button type="submit">Registrieren</button>
                    </form>
                    <p style={{ color: '#b3b3b3' }}>Haben Sie ein Account? <Link href="/login" style={{ color: '#fff' }}>Hier Anmelden.</Link></p>
                </div>
            </div>
        </>
    )
}