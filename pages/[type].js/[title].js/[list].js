import { useState, useEffect } from 'react';
import { fetchEpisodes } from '@/utils/apiHelpers';  // Pfad zu deiner api.js-Datei anpassen
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/header';

import Episode from '@/public/assets/images/Episodes.jpeg'


export default function List() {

    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { type, title } = router.query;

    useEffect(() => {
        fetchEpisodes()
            .then(data => {
                setEpisodes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der Episoden:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Lade Episoden...</div>;

    const Item = episodes[type][0][type]

    return (
        <>
            <Head>
                <title>{episodes[type][0].title}</title>
                <meta name="description" content={episodes[type][0].description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <Header />
            <div className={styles.episodeGrid} style={{ marginTop: 100 }}>
                {Item.map((episode) => (
                    <li
                        key={episode.id}
                        className={styles.episodeCard}
                    >
                        <Link href={`/${type}/${title}/episode/${episode.id}`}>
                            <Image
                                src={episode.thumbnail || Episode}
                                alt='Episode'
                                width={300}
                                height={400}
                                priority
                            />
                            <p>{episode.title}</p>
                        </Link>
                    </li>
                ))}
            </div>
        </>
    );
}