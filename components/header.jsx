import Link from "next/link"
import Image from "next/image"
import HeaderStyles from '@/styles/Home.module.css'
import packageJson from '../package.json';

import Netflix from '@/public/assets/images/Netflix.png'

const version = packageJson.version;

export default function Header() {

    return (
        <div className={`test ${HeaderStyles.navbar}`}>
            <div className={HeaderStyles.navbarContent}>
                <div className={HeaderStyles.navbarLinks}>
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
                <p>Beta v.{version}</p>
            </div>
        </div>
    )
}