import Head from 'next/head'
import Link from 'next/link';
import styles from '@/styles/Index.module.css';

export default function Goodbey() {

    return (
        <>
            <Head>
                <title>Goodbey</title>
                <meta name="description" content="Tauchen Sie ein in die fesselnde Welt von Detektiv Conan, jetzt optimiert für Netflix! Unsere speziell entwickelte App bietet Ihnen ein nahtloses Erlebnis, um alle Ihre Lieblingsfolgen und -filme von Detektiv Conan zu genießen." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className={styles.header}>
                <div className={styles.header_content}>
                    <h1>Wir werden dich vermissen!</h1>
                    <p>Wir sind traurig, Sie gehen zu sehen. Bei Netflix streben wir stets danach, Ihnen das beste Erlebnis zu bieten. Wenn Sie jemals wieder in die spannende Welt von Detektiv Conan eintauchen möchten, sind wir immer hier, um Sie willkommen zu heißen.</p>
                    <button><Link href='/'>Zur Startseite</Link></button>
                </div>
            </main>
        </>
    )
}
