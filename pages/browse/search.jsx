import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '@/utils/firebase';
import { collection, getDocs } from '@firebase/firestore';
import Card from '@/components/Card';
import Head from 'next/head';
import styles from '@/styles/Search.module.css';
import Header from '@/components/header';

export default function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const query = searchTerm;
            router.push(`/browse/search?query=${query}`, undefined, { shallow: true });

            const seriesCollection = collection(db, 'series');
            const moviesCollection = collection(db, 'movies');

            const seriesData = await getDocs(seriesCollection);
            const moviesData = await getDocs(moviesCollection);

            const allData = [...seriesData.docs, ...moviesData.docs];

            const filteredResults = [];

            for (let doc of allData) {
                const docData = doc.data();

                if (docData.series) {
                    for (let episode of docData.series) {
                        if (episode.title && episode.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                            filteredResults.push(episode);
                        }
                    }
                }
                if (docData.movies) {
                    for (let movie of docData.movies) {
                        if (movie.title && movie.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                            filteredResults.push(movie);
                        }
                    }
                }
            }

            setResults(filteredResults);
        };

        if (searchTerm) {
            fetchData();
        } else {
            setResults([]);
        }
    }, [searchTerm]);

    return (
        <>
            <Head>
                <title>Netflix | Suche</title>
                <meta name="description" content="Tauchen Sie ein in die fesselnde Welt von Detektiv Conan, jetzt optimiert für Netflix! Unsere speziell entwickelte App bietet Ihnen ein nahtloses Erlebnis, um alle Ihre Lieblingsfolgen und -filme von Detektiv Conan zu genießen." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <Header />
            <div style={{ marginTop: 100 }} className={styles.main_wrapper}>
                <div className={styles.input_wrapper}>
                    <input
                        type="text"
                        placeholder="Suchen..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                {searchTerm ? (
                    results.length ? (
                        <div className={styles.episodeGrid}>
                            {results.map(item => (
                                <li key={`${item.title}-${item.id}`} className={styles.episodeCard}>
                                    <Card title={item.title} thumbnail={item.thumbnail} url={`/browse/${item.type}/detectiv-conan/episode/${item.id}`} />
                                </li>
                            ))}
                        </div>
                    ) : (
                        <h2 className={styles.heading2}>Keine Ergebnisse gefunden.</h2>
                    )
                ) : (
                    <h2 className={styles.heading2}>Suchen Sie nach einem Film oder einer Serie...</h2>
                )}
            </div>
        </>
    );
}
