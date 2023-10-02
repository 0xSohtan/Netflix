import Head from 'next/head';
import { db } from '@/utils/firebase';
import { doc, collection, getDocs, updateDoc, arrayUnion } from '@firebase/firestore';
import { useEffect } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useState } from 'react';
import Header from '@/components/header';
import toast, { Toaster } from 'react-hot-toast';
import styles from '@/styles/Admin.module.css';

export default function AdminDashboard() {

    useRequireAuth();
    const [selectedOption, setSelectedOption] = useState('series');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newId, setNewId] = useState(0);
    const [newUrl, setNewUrl] = useState('');
    const [newThumbnail, setNewThumbnail] = useState('');
    const videoList = collection(db, selectedOption);

    useEffect(() => {

        getList()

    }, []);

    const getList = async () => {
        try {
            const data = await getDocs(videoList);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const movies = filteredData[0][`${selectedOption}`];
            console.log(filteredData);
            console.log(movies);
            toast.success("Check die Console!");
        } catch (err) {
            console.error(err);
            toast.error("Fehler beim Console.log!");
        }
    };

    const newVideo = {
        title: newTitle,
        description: newDescription,
        id: newId,
        thumbnail: newThumbnail,
        url: newUrl,
        type: selectedOption,
    }

    const onSubmitVideo = async (event) => {
        event.preventDefault(); // Verhindert das Standardverhalten des Formulars
        // Referenz zum spezifischen Dokument, das Sie aktualisieren möchten
        const videoListDocRef = doc(db, selectedOption, "detectiv-conan"); // Ersetzen Sie "YOUR_DOCUMENT_ID_HERE" durch die ID des spezifischen Dokuments, das Sie aktualisieren möchten

        try {
            // Aktualisieren Sie das Array im Dokument mit dem neuen Video
            await updateDoc(videoListDocRef, {
                [`${selectedOption}`]: arrayUnion(newVideo)
            });
            toast.success("Video erfolgreich hinzugefügt!");
        } catch (err) {
            toast.error("Fehler beim Hinzufügen des Videos");
        }
    };


    return (
        <>
            <Head>
                <title>Admin Dashboard | Netflix</title>
                <meta name="description" content="Admin Dashboard" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <div style={{ marginTop: 100 }}>
                <form onSubmit={onSubmitVideo} className={styles.videoForm}>
                    <div className={styles.radioBlock}>
                        <input type='radio' value={'movies'} checked={selectedOption === 'movies'} onChange={e => setSelectedOption(e.target.value)} />
                        <label>Movie</label>
                        <input type='radio' value={'series'} checked={selectedOption === 'series'} onChange={e => setSelectedOption(e.target.value)} />
                        <label>Serie</label>
                    </div>
                    <div className={styles.inputBlock}>
                        <input placeholder='Title' onChange={e => setNewTitle(e.target.value)} />
                        <input placeholder='Description' onChange={e => setNewDescription(e.target.value)} />
                        <input placeholder='ID' type='number' max='1000' min='0' onChange={(e) => setNewId(Number(e.target.value))} />
                        <input placeholder='Thumbnail' onChange={e => setNewThumbnail(e.target.value)} />
                        <input placeholder='URL' onChange={e => setNewUrl(e.target.value)} />
                    </div>
                    <div className={styles.buttonBlock}>
                        <button type='submit'>Submit</button>
                        <button onClick={getList}>Test</button>
                    </div>
                </form>
            </div>

            <Toaster />
        </>
    )
}