import { useState, useEffect } from 'react';
import { fetchEpisodes } from '@/utils/apiHelpers';  // Pfad zu deiner api.js-Datei anpassen
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/VideoPlayer';

function Episode() {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id: episodeID } = router.query;

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

    const test = episodes.series[0].episode;
    const showAll = test.find(test => test.id === Number(episodeID));

    if (!showAll) return <div>Episode mit ID { episodeID } nicht gefunden</div>;

    return (
        <div>
            <div>
                <h1>{showAll.title}</h1>
                <p>{showAll.description}</p>
                <p>Folge: {showAll.id}</p>
                <VideoPlayer src={showAll.url} />
            </div>
        </div>
    );
}


export default Episode;
