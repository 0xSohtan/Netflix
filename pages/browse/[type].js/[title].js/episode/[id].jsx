import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useState, useEffect } from 'react';
import fetchDataFromFirestore from '@/utils/firebaseHelper';
import { useRouter } from 'next/router';
import VideoPlayer from '@/components/VideoPlayer';
import Head from 'next/head';
import firebase from '@/utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '@/components/Loading';

function Episode() {

    useRequireAuth();

    const [episodes, setEpisodes] = useState({});
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const { type, title: link_url, id: episodeID } = router.query;

    useEffect(() => {

        const auth = getAuth(firebase);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push('/login');
            }
        });

        if (!type && !link_url) return;

        const getData = async () => {
            const video = await fetchDataFromFirestore(type, link_url);

            if (video) {
                setEpisodes(video)
                setLoading(false);
            }
        };

        getData();

        return () => unsubscribe();

    }, [type, link_url]);

    if (loading) return <>
        <Loading />
    </>;

    // if (user && !user.emailVerified) {
    //     return (
    //         <div style={{
    //             display: 'flex',
    //             justifyContent: 'center',
    //             alignItems: 'center',
    //             width: '100%',
    //             height: '100vh'
    //         }}>
    //             Bitte bestätigen Sie Ihre E-Mail-Adresse, um auf diese Seite zuzugreifen.
    //         </div>
    //     );
    // }

    const episodeTypeData = episodes[type];
    const currentEpisode = episodeTypeData.find(episode => episode.id === Number(episodeID));
    const currentEpisodeIndex = episodeTypeData.findIndex(episode => episode.id === Number(episodeID));

    const nextEpisode = episodeTypeData[currentEpisodeIndex + 1];
    const prevEpisode = episodeTypeData[currentEpisodeIndex - 1];

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
                    <VideoPlayer src={currentEpisode.url} title={currentEpisode.title} id={currentEpisode.id} name={episodes.title} next={nextEpisode} prev={prevEpisode} type={type} link_url={link_url} />
                </div>
            </div>
        </>
    );
}

export default Episode;
