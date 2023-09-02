import { useState, useEffect } from 'react';
import { fetchEpisodes } from '@/utils/apiHelpers';  // Pfad zu deiner api.js-Datei anpassen
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import Episode from '@/public/assets/images/Episodes.jpeg'


export default function List() {

    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { type, title } = router.query;

    useEffect(() => {
        fetchEpisodes()
            .then(data => {
                setEpisodes(data.series[0].episode);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fehler beim Abrufen der Episoden:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Lade Episoden...</div>;

    return (
        <div className={styles.episodeGrid}>
            {episodes.map((episode) => (
                <li
                    key={episode.id}
                    className={styles.episodeCard}
                >
                    <Link href={`http://localhost:3000/${ type }/${ title }/episode/${episode.id}`}>
                        <Image
                            src={episode.thumbnail || Episode}
                            alt='Episode'
                            width={300}
                            height={400}
                            priority
                        />
                        <p>{episode.title}</p>
                        <p>{episode.description}</p>
                    </Link>
                </li>
            ))}
        </div>
    );
}