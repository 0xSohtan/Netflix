import Link from "next/link"
import Image from "next/image"
import HeaderStyles from '@/styles/Home.module.css'

import Netflix from '@/public/assets/images/Netflix.png'

export default function Header() { 

    return (
        <div className={`test ${HeaderStyles.navbar}`}>
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