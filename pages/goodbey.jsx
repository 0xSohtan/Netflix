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

            <main className={styles.pageBody}>
                <div className={styles.form_wrapper}>
                    <h2>Wir werden dich vermissen!</h2>
                    <Link href="/" style={{ color: '#fff' }}>Zur Startseite</Link>
                </div>
            </main>
        </> 
    )
}
