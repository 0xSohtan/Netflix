import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { fetchEpisodes } from '@/utils/apiHelpers';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/Home.module.css'

import Episode from '@/public/assets/images/Episodes.jpeg'

export default function TypeList() {

    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { type } = router.query;

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

    const test = episodes[type] ? episodes[type][0] : [];

    return (                    
        <div className={styles.episodeGrid}>
          <li
            className={styles.episodeCard}
          >
            <Link href={`/${ type }/episode/list`}>
              <Image
                src={Episode}
                alt='Episode'
                width={300}
                height={400}
                priority
              />
              <p>{test.title}</p>
              <p>{test.description || 'Test'}</p>
            </Link>
          </li>
      </div>
    );
}