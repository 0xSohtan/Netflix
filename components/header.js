import Link from "next/link"
import Image from "next/image"
import HeaderStyles from '@/styles/Home.module.css'
// import React, { useState, useEffect } from 'react';

import Netflix from '@/public/assets/images/Netflix.png'

export default function Header() {

    // const [scrolling, setScrolling] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (window.scrollY > 10) {  // Du kannst diesen Wert anpassen
    //             setScrolling(true);
    //         } else {
    //             setScrolling(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <div className={HeaderStyles.navbar}>
            <div className={HeaderStyles.navbarContent}>
                <Link href="/">
                    <Image
                        src={Netflix}
                        alt='Netflix'
                        width={100}
                        priority
                    />
                </Link>
                <ul className={HeaderStyles.navLinksWrapper}>
                    <li className={HeaderStyles.navLinks}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={HeaderStyles.navLinks}>
                        <Link href="/series/list">Series</Link>
                    </li>
                    <li className={HeaderStyles.navLinks}>
                        <Link href="/movies/list">Filme</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}