import { useRequireAuth } from '@/hooks/useRequireAuth';
import Header from "@/components/header"
import Head from "next/head"
import profileStyles from '@/styles/Profile.module.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from '@/utils/firebase'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {

    useRequireAuth();

    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const auth = getAuth(firebase);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                console.log(currentUser)
            } else {
                // Weiterleitung zur Login-Seite, wenn der Benutzer nicht angemeldet ist
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, []);

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
                <button onClick={handleLogout}>Logout</button> {/* Logout-Button hinzugefügt */}
            </div>
            <Toaster />
        </>
    )
}