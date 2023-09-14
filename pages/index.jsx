import Head from 'next/head'
import Link from 'next/link';
import styles from '@/styles/Index.module.css';

export default function Home() {

  return (
    <>
      <Head>
        <title>Willkommen bei Netflix</title>
        <meta name="description" content="Tauchen Sie ein in die fesselnde Welt von Detektiv Conan, jetzt optimiert für Netflix! Unsere speziell entwickelte App bietet Ihnen ein nahtloses Erlebnis, um alle Ihre Lieblingsfolgen und -filme von Detektiv Conan zu genießen." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.pageBody}>
        <div className={styles.main_wrapper}>
          <h1 className={styles.title}>Willkommen bei Netflix</h1>
          <div className={styles.buttonContainer}>
            <Link href={'/login'}>
              <p className={styles.button}>Login</p>
            </Link>
            <Link href={'/register'}>
              <p className={styles.button}>Registrieren</p>
            </Link>
            <Link href={'/browse'}>
              <p className={styles.button}>App starten</p>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
