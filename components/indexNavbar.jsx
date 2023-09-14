import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from 'react';
import firebase from '@/utils/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Netflix from '@/public/Netflix.png'
import styles from '@/styles/IndexNavbar.module.css'

export default function Navbar() {

    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const auth = getAuth(firebase);
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/">
                    <Image
                        src={Netflix}
                        alt='Netflix'
                        width={150}
                        priority
                    />
                </Link>
                <div>
                    {isLogged ? (
                        <button className={styles.navButton}>
                            <Link href={'/browse'}>Browse</Link>
                        </button>
                    ) : (
                        <button className={styles.navButton}>
                            <Link href={'/login'}>Login</Link>
                        </button>
                    )}
                </div>
            </nav>
        </>
    )
}