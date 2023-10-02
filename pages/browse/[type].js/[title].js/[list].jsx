import { useState, useEffect } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import fetchDataFromFirestore from '@/utils/firebaseHelper';
import Card from '@/components/Card';
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@/components/header';
import Loading from '@/components/Loading';

export default function List() {

    useRequireAuth();

    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { type, title } = router.query;

    useEffect(() => {

        if (!type) return;

        const getData = async () => {
            const video = await fetchDataFromFirestore(type, "detectiv-conan");

            if (video) {
                setEpisodes(video)
                setLoading(false);
            }
        };

        getData();

    }, [type]);

    if (loading) return <>
        <Loading />
    </>;

    const Item = episodes[type];

    return (
        <>
            <Head>
                <title>{episodes.title}</title>
                <meta name="description" content={episodes.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />
            <div className={styles.episodeGrid} style={{ marginTop: 100 }}>
                {Item.map((episode) => (
                    <li
                        key={episode.id}
                        className={styles.episodeCard}
                    >
                        <Card title={episode.title} thumbnail={episode.thumbnail} url={`/browse/${type}/${title}/episode/${episode.id}`} />
                    </li>
                ))}
            </div>
        </>
    );
}