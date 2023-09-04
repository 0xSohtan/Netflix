import { useState, useEffect } from 'react';
import { fetchEpisodes } from '@/utils/apiHelpers';  // Pfad zu deiner api.js-Datei anpassen
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/VideoPlayer';
import Head from 'next/head';

function Episode() {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { type, title, id: episodeID } = router.query;

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

    const test = episodes[type][0][type];
    const showAll = test.find(test => test.id === Number(episodeID));

    if (!showAll) return <div>Episode mit ID {episodeID} nicht gefunden</div>;

    return (
        <>
            <Head>
                <title>{showAll.title}</title>
                <meta name="description" content={showAll.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>
            <div style={{ marginTop: 100 }}>
                <div>
                    <h1>{showAll.title}</h1>
                    <p>{showAll.description}</p>
                    <p>Folge: {showAll.id}</p>
                    <VideoPlayer src={showAll.url} />
                </div>
            </div>
        </>
    );
}


export default Episode;
