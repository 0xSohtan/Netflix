import styles from '@/styles/404.module.css';
import { useRouter } from 'next/router';

export default function Custom404() {

    const router = useRouter();
    const goBack = () => {
        router.back();
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>404</h1>
            <p className={styles.description}>Ups! Die Seite, die Sie suchen, konnte nicht gefunden werden.</p>
            <a onClick={goBack} className={styles.link}>
                Zurück zur Startseite
            </a>
        </div>
    );
}
