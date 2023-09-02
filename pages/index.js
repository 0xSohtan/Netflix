import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import Link from 'next/link';

import Episode from '@/public/assets/images/Episodes.jpeg'
import DetektivConan from '@/public/assets/images/DetektivConan.jpeg'

export default function Home() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch('/api/list')  // Annahme, dass dies der Endpunkt ist, um alle Episoden zu erhalten
      .then(response => response.json())
      .then(data => {
        setEpisodes(data.series[0].episode);
      })
      .catch(error => console.error('Fehler beim Abrufen der Episoden:', error));
  }, []);

  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // Während es noch Elemente zum Mischen gibt...
    while (currentIndex !== 0) {

      // Wähle ein verbleibendes Element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Und tausche es mit dem aktuellen Element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const randomEpisode = shuffleArray([...episodes]).slice(0, 6);


  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>

        <div
          style={{
            backgroundImage: `url(${DetektivConan.src})`,
            backgroundColor: 'black',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '50vh',
          }}
        >

        </div>

        <div className={styles.info}>
          <p>
            Detektiv Conan
          </p>
          <Link href={`/detectiv-conan/episode/list`}>
            Mehr Anzeigen
          </Link>
        </div>

        <div className={styles.episodeGrid}>
          {randomEpisode.map((episode) => (
            <li
              key={episode.id}
              className={styles.episodeCard}
            >
              <Link href={`/series/detectiv-conan/episode/${episode.id}`}>
                <Image
                  src={episode.thumbnail || Episode}
                  alt='Episode'
                  width={300}
                  height={400}
                  priority
                />
                <p>{episode.title}</p>
                <p>{episode.description}</p>
              </Link>
            </li>
          ))}
        </div>

      </main>
    </>
  )
}