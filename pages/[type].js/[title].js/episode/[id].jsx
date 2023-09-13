import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useState, useEffect } from 'react';
import { fetchEpisodes } from '@/utils/apiHelpers';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/VideoPlayer';
import Head from 'next/head';
import firebase from '@/utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Episode() {

    useRequireAuth();

    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { type, title, id: episodeID } = router.query;

    useEffect(() => {
        const auth = getAuth(firebase);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/login');
            }
        });

        return () => unsubscribe();
    }, []);

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

    if (user && !user.emailVerified) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh'
            }}>
                Bitte bestätigen Sie Ihre E-Mail-Adresse, um auf diese Seite zuzugreifen.
            </div>
        );
    }

    const episodeTypeData = episodes[type][0][type];
    const episodeTypeList = episodes[type];
    const currentEpisode = episodeTypeData.find(episode => episode.id === Number(episodeID));
    const currentShow = episodeTypeList.find(show => show.link_url === String(title));

    if (!currentEpisode) return <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
    }}>Episode mit ID {episodeID} nicht gefunden</div>;

    return (
        <>
            <Head>
                <title>{currentEpisode.title}</title>
                <meta name="description" content={currentEpisode.description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div>
                <div>
                    <VideoPlayer src={currentEpisode.url} title={currentEpisode.title} id={currentEpisode.id} name={currentShow.title} />
                </div>
            </div>
        </>
    );
}

export default Episode;
