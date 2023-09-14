import Head from 'next/head'
import Link from 'next/link';
import styles from '@/styles/Index.module.css';
import Navbar from '@/components/indexNavbar';

export default function Home() {

  return (
    <>
      <Head>
        <title>Willkommen bei Netflix</title>
        <meta name="description" content="Tauchen Sie ein in die fesselnde Welt von Detektiv Conan, jetzt optimiert für Netflix! Unsere speziell entwickelte App bietet Ihnen ein nahtloses Erlebnis, um alle Ihre Lieblingsfolgen und -filme von Detektiv Conan zu genießen." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className={styles.header}>
        <Navbar />
        <div className={styles.header_content}>
          <h1>Detektiv Conan auf Netflix</h1>
          <h3>Das Rätsel beginnt hier!</h3>
          <p>Tauchen Sie ein in die fesselnde Welt von Detektiv Conan, jetzt optimiert für Netflix! Unsere speziell entwickelte App bietet Ihnen ein nahtloses Erlebnis, um alle Ihre Lieblingsfolgen und -filme von Detektiv Conan zu genießen. Werden Sie Zeuge, wie Conan jedes Rätsel löst und sich durch spannende Abenteuer kämpft, alles in HD-Qualität. Fangen Sie heute an zu streamen!</p>
          <button><Link href='/register'>Eröffne Jetzt dein Account</Link></button>
        </div>
      </main>
    </>
  )
}
