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

    if (loading) return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
    }}>Lade Episoden...</div>;

    const test = episodes[type][0][type];
    const test2 = episodes[type];
    const showAll = test.find(test => test.id === Number(episodeID));
    const showAll2 = test2.find(test2 => test2.link_url === String(title));

    if (!showAll) return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
    }}>Episode mit ID {episodeID} nicht gefunden</div>;

    return (
        <>
            <Head>
                <title>{showAll.title}</title>
                <meta name="description" content={showAll.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
                <div>
                    <VideoPlayer src={showAll.url} title={showAll.title} id={showAll.id} name={showAll2.title} />
                </div>
            </div>
        </>
    );
}


export default Episode;
