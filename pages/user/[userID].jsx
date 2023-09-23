import { useRequireAuth } from '@/hooks/useRequireAuth';
import Header from "@/components/header"
import Head from "next/head"
import Image from 'next/image';
import userStyles from '@/styles/Profile.module.css'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import firebase from '@/utils/firebase'
import { getAuth, onAuthStateChanged, signOut, sendEmailVerification, deleteUser, updateProfile } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import userPicture from '@/public/User.png'

export default function UserProfile() {

    useRequireAuth();

    const [user, setUser] = useState(null);
    const [lastClicked, setLastClicked] = useState(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const auth = getAuth(firebase);
    const router = useRouter();
    const { userID } = router.query;
    // const moviesList = collection(db, "movies");

    const avatars = [
        'https://shdw-drive.genesysgo.net/DdMHdxd8NyWWrHKwMUhp6TxEEyyY4pE3ZUbe4pxEp8iC/Agasa.png',
        'https://shdw-drive.genesysgo.net/DdMHdxd8NyWWrHKwMUhp6TxEEyyY4pE3ZUbe4pxEp8iC/Ai.png',
        'https://shdw-drive.genesysgo.net/DdMHdxd8NyWWrHKwMUhp6TxEEyyY4pE3ZUbe4pxEp8iC/Conan.png',
        'https://shdw-drive.genesysgo.net/DdMHdxd8NyWWrHKwMUhp6TxEEyyY4pE3ZUbe4pxEp8iC/Kogoro.png',
        'https://shdw-drive.genesysgo.net/DdMHdxd8NyWWrHKwMUhp6TxEEyyY4pE3ZUbe4pxEp8iC/Kudo.png',
        'https://shdw-drive.genesysgo.net/DdMHdxd8NyWWrHKwMUhp6TxEEyyY4pE3ZUbe4pxEp8iC/Ran.png'
    ]

    useEffect(() => {

        // const getList = async () => {
        //     try {
        //         const data = await getDocs(moviesList);
        //         const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        //         const movies = filteredData[0].movies
        //         console.log(filteredData)
        //     } catch (err) {
        //         console.error(err)
        //     }
        // };

        // getList()

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setAuthChecked(true);
            if (currentUser) {
                if (currentUser.uid !== userID) {
                    toast.error('Zugriff verweigert. Sie können nur auf Ihr eigenes Profil zugreifen.');
                    router.push('/browse');
                } else {
                    setUser(currentUser);
                    // console.log(currentUser)
                }
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, [userID]);

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
                router.push('/goodbey'); // oder wohin auch immer Sie den Benutzer nach dem Löschen seines Kontos weiterleiten möchten
            } catch (error) {
                console.error("Fehler beim Löschen des Kontos.");
                toast.error('Fehler beim Löschen des Kontos. Bitte versuchen Sie es erneut.');
            }
        }
    };


    const handleLogout = () => {
        signOut(auth).then(() => {
            console.log("User signed out");
            toast.success('Sie wurden erfolgreich abgemeldet.');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        });
    };

    const changeProfilePicture = async (avatars) => {
        const user = auth.currentUser;

        if (user) {
            try {
                await updateProfile(user, {
                    photoURL: avatars
                });
                toast.success('User photoURL updated successfully');
                setTimeout(() => {
                    router.reload();
                }, 2000)
            } catch (error) {
                toast.error('Error updating user photoURL:');
            }
        }
    }

    if (!authChecked) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100vh'
        }}>Lade...</div>; // Sie können hier jede Ladeanzeige anzeigen, die Sie möchten
    }

    return (
        <>
            <Head>
                <title>Mein Profil | Netflix</title>
                <meta name="description" content="Verwalten Sie Ihr Netflix-Profil. Ändern Sie Ihre Einstellungen, überprüfen Sie Ihre Watchlist und aktualisieren Sie Ihre Kontoinformationen." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <div className={userStyles.main_wrapper}>

                {showModal && (
                    <>
                        <div className={userStyles.modal}>
                            <div>
                                <h2 style={{ textAlign: 'center' , marginBottom: 40 }}>Wähle dein Profilbild aus!</h2>
                                <div className={userStyles.imageOption}>
                                    {avatars.map((avatar, index) => (
                                        <div key={index} onClick={() => changeProfilePicture(avatar)} className={userStyles.option}>
                                            <Image src={avatar} width={100} height={100} alt={`Avatar ${index + 1}`} style={{ borderRadius: '100%', cursor: 'pointer' }} />
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => setShowModal(false)}>Schließen</button>
                            </div>
                        </div>
                    </>
                )}

                <div className={userStyles.account_wrapper}>
                    <div onClick={() => setShowModal(true)} style={{ display: 'flex', justifyContent: 'center', margin: 40 }}>
                        <Image
                            src={user.photoURL || userPicture}
                            width={100}
                            height={100}
                            style={{ borderRadius: '100%', cursor: 'pointer' }}
                            alt='Profilbild'
                            priority
                        />
                    </div>
                    {user && <div>Benutzername: {user.displayName || 'Unbekannt'}</div>}
                    {user && <div>Email: {user.email}</div>}
                    {user && !user.emailVerified && (
                        <>
                            <p>Verified: Ihre E-Mail-Adresse wurde noch nicht bestätigt.</p>
                            <button onClick={handleButtonClick}>Bestätigungs-E-Mail erneut senden</button>
                        </>
                    )}
                    {user && user.emailVerified && (
                        <p>Verified: Ihre E-Mail-Adresse wurde bestätigt!</p>
                    )}
                    {/* {user && <div>Telefonnummer: {user.phoneNumber || 'Unbekannt'}</div>} */}
                    {user && <div>Account erstellt: {user.metadata.creationTime || 'Unbekannt'}</div>}
                    {user && <div>Last Login: {user.metadata.lastSignInTime || 'Unbekannt'}</div>}
                    <button onClick={handleLogout}>Logout</button>
                    <button onClick={handleDeleteAccount}>Account löschen</button>
                </div>
            </div>
            <Toaster />
        </>
    )
}