import Link from "next/link"
import styles from './styles/Header.module.css'

export default function Header() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <Link href="/">Netflix</Link>
            <ul style={{
                display: 'flex',
            }}>
                <li className=''><Link href="/">Home</Link></li>
                <li className=''><Link href="/series/list">Series</Link></li>
                <li className=''><Link href="/movies/list">Filme</Link></li>
            </ul>
        </div>
    )
}