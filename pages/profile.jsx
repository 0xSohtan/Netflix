import { useRequireAuth } from '@/hooks/useRequireAuth';
import Header from "@/components/header"
import Head from "next/head"
import profileStyles from '@/styles/Profile.module.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from '@/utils/firebase'
import { getAuth, onAuthStateChanged, signOut, sendEmailVerification, deleteUser } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {

    useRequireAuth();

    const [user, setUser] = useState(null);
    const [lastClicked, setLastClicked] = useState(null);
    const router = useRouter();
    const auth = getAuth(firebase);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, []);

    const resendVerificationEmail = async () => {
        const user = auth.currentUser;

        try {
            await sendEmailVerification(user);
            toast.success('Bestätigungs-E-Mail erneut gesendet!');
        } catch (error) {
            toast.error('Fehler beim erneuten Senden der Bestätigungs-E-Mail.');
        }
    };

    const handleButtonClick = () => {
        const now = Date.now();

        if (lastClicked && now - lastClicked < 60000) {
            toast.error('Bitte warten Sie 1 Minute, bevor Sie erneut auf den Button klicken.');
            return;
        }

        resendVerificationEmail();

        // Aktualisieren Sie den Zustand mit dem aktuellen Zeitpunkt
        setLastClicked(now);
    };

    const handleDeleteAccount = async () => {
        if (window.confirm("Sind Sie sicher, dass Sie Ihr Konto löschen möchten? Dies kann nicht rückgängig gemacht werden!")) {
            try {
                await deleteUser(auth.currentUser);
                toast.success('Ihr Konto wurde erfolgreich gelöscht.');
                router.push('/register'); // oder wohin auch immer Sie den Benutzer nach dem Löschen seines Kontos weiterleiten möchten
            } catch (error) {
                console.error("Fehler beim Löschen des Kontos:", error);
                toast.error('Fehler beim Löschen des Kontos. Bitte versuchen Sie es erneut.');
            }
        }
    };


    const handleLogout = () => {
        const auth = getAuth(firebase);
        signOut(auth).then(() => {
            console.log("User signed out");
            toast.success('Sie wurden erfolgreich abgemeldet.');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        });
    };

    return (
        <>
            <Head>
                <title>Mein Profil | Netflix</title>
                <meta name="description" content="Verwalten Sie Ihr Netflix-Profil. Ändern Sie Ihre Einstellungen, überprüfen Sie Ihre Watchlist und aktualisieren Sie Ihre Kontoinformationen." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {user && <div>Email: {user.email}</div>}
                {user && !user.emailVerified && (
                    <>
                        <p>Ihre E-Mail-Adresse wurde noch nicht bestätigt.</p>
                        <button onClick={handleButtonClick}>Bestätigungs-E-Mail erneut senden</button>
                    </>
                )}
                {user && user.emailVerified && (
                    <p>Ihre E-Mail-Adresse wurde bestätigt!</p>
                )}
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleDeleteAccount}>Account löschen</button>
            </div>
            <Toaster />
        </>
    )
}