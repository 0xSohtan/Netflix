import Link from "next/link"
import Image from "next/image"
import firebase from '@/utils/firebase';
import { getAuth } from 'firebase/auth';
import HeaderStyles from '@/styles/Header.module.css'
import packageJson from '../package.json';
import React, { useState, useEffect } from 'react';
import Netflix from '@/public/Netflix.png'

const version = packageJson.version;

export default function Header() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const auth = getAuth(firebase);
        const user = auth.currentUser;

        if (user) {
            setUserID(user.uid);
        }
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className={HeaderStyles.navbar}>
                <div className={HeaderStyles.navbarContent}>
                    {/* Mobile Menu Button */}
                    <button className={HeaderStyles.menuButton} onClick={toggleMenu}>
                        {menuOpen ? (
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        ) : (
                            <span className="material-symbols-outlined">
                                menu
                            </span>
                        )}
                    </button>

                    <div className={HeaderStyles.navLinksWrapper}>
                        {/* Netflix Logo */}
                        <Link href="/browse" className={HeaderStyles.navbarIconLink}>
                            <Image
                                src={Netflix}
                                alt='Netflix'
                                className={HeaderStyles.icon}
                                width={100}
                                priority
                            />
                        </Link>

                        {/* Navigation Links */}
                        <div className={`${HeaderStyles.navLinksList} ${menuOpen ? HeaderStyles.open : ''}`}>
                            <ul>
                                <li className={HeaderStyles.navLinks}>
                                    <Link href="/browse" onClick={toggleMenu}>Home</Link>
                                </li>
                                <li className={HeaderStyles.navLinks}>
                                    <Link href="/browse/series/list" onClick={toggleMenu}>Series</Link>
                                </li>
                                <li className={HeaderStyles.navLinks}>
                                    <Link href="/browse/movies/list" onClick={toggleMenu}>Filme</Link>
                                </li>
                            </ul>
                            <ul>
                                <li className={HeaderStyles.navLinks}>
                                    <Link href={`/user/${userID}`} onClick={toggleMenu}>Profile</Link>
                                </li>
                                <li className={HeaderStyles.navLinks}>
                                    <p style={{ textAlign: 'center' }} className={HeaderStyles.versionText}>Beta v.{version}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}