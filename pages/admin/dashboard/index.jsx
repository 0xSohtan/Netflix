import Head from 'next/head';
import { db } from '@/utils/firebase';
import { doc, addDoc, collection, getDocs, updateDoc, arrayUnion } from '@firebase/firestore';
import { useEffect } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminDashboard() {

    useRequireAuth();
    const [selectedOption, setSelectedOption] = useState('series');
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newId, setNewId] = useState(0);
    const [newUrl, setNewUrl] = useState('');
    const [newThumbnail, setNewThumbnail] = useState('');
    const moviesList = collection(db, selectedOption);

    useEffect(() => {

        getList()

    }, []);

    const getList = async () => {
        try {
            const data = await getDocs(moviesList);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const movies = filteredData[0][`${selectedOption}`];
            console.log(filteredData);
            console.log(movies);
        } catch (err) {
            console.error(err);
        }
    };

    const newVideo = {
        title: newTitle,
        description: newDescription,
        id: newId,
        thumbnail: newThumbnail,
        url: newUrl,
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
            <form onSubmit={onSubmitVideo}>
                <div>
                    <input type='radio' value={'movies'} checked={selectedOption === 'movies'} onChange={e => setSelectedOption(e.target.value)} />
                    <label>Movie</label>
                    <input type='radio' value={'series'} checked={selectedOption === 'series'} onChange={e => setSelectedOption(e.target.value)} />
                    <label>Serie</label>
                </div>
                <input placeholder='title' onChange={e => setNewTitle(e.target.value)} />
                <input placeholder='description' onChange={e => setNewDescription(e.target.value)} />
                <input placeholder='id' type='number' max='1000' min='0' onChange={(e) => setNewId(Number(e.target.value))} />
                <input placeholder='thumbnail' onChange={e => setNewThumbnail(e.target.value)} />
                <input placeholder='url' onChange={e => setNewUrl(e.target.value)} />
                <button type='submit'>Submit</button>
            </form>
            <button onClick={getList}>Test</button>
            <Toaster />
        </>
    )
}