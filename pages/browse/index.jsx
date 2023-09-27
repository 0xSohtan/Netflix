import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useState, useEffect } from 'react';
import fetchDataFromFirestore from '@/utils/firebaseHelper';
import Link from 'next/link';
import Header from '@/components/header';
import { useRequireAuth } from '@/hooks/useRequireAuth';

import Episode from '@/public/Episodes.jpeg'

export default function Browse() {

  useRequireAuth();

  const [episodes, setEpisodes] = useState([]);
  const [links, setLink] = useState([]);
  const [movies, setMovie] = useState([]);
  const [infos, setInfos] = useState([]);

  useEffect(() => {

    const getData = async () => {
      const movies = await fetchDataFromFirestore("movies", "detectiv-conan");
      const series = await fetchDataFromFirestore("series", "detectiv-conan");

      if (movies && series) {
        setEpisodes(series.series);
        setLink(series);
        setMovie(movies.movies);
        setInfos(movies);
      }
    };

    getData();

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
  const randomMovie = shuffleArray([...movies]).slice(0, 6);

  function truncateTitle(title, maxLength = 30) {
    if (title.length <= maxLength) return title;
    return title.slice(0, maxLength) + '...';
  }

  return (
    <>
      <Head>
        <title>Netflix | Startseite</title>
        <meta name="description" content="Tauchen Sie ein in die fesselnde Welt von Detektiv Conan, jetzt optimiert für Netflix! Unsere speziell entwickelte App bietet Ihnen ein nahtloses Erlebnis, um alle Ihre Lieblingsfolgen und -filme von Detektiv Conan zu genießen." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header />

      <main>

        <div className={styles.mainImage}>
        </div>

        <div className={styles.info}>
          <h4>
            {links.title}
          </h4>
          <Link href={`/browse/${links.type}/${links.link_url}/list`}>
            <h5>
              Mehr Anzeigen
            </h5>
          </Link>
        </div>

        <div className={styles.episodeGrid}>
          {randomEpisode.map((episode) => (
            <li
              key={episode.id}
              className={styles.episodeCard}
            >
              <Link href={`/browse/${links.type}/${links.link_url}/episode/${episode.id}`}>
                <Image
                  width={300}
                  height={400}
                  src={episode.thumbnail || Episode}
                  alt='Episode'
                  className={styles.episodeImage}
                  priority
                />
                <p title={episode.title}>{truncateTitle(episode.title)}</p>
              </Link>
            </li>
          ))}
        </div>

        <div className={styles.info} style={{ marginTop: '50px' }}>
          <h4>
            {infos.title}
          </h4>
          <Link href={`/browse/${infos.type}/${infos.link_url}/list`}>
            <h5>
              Mehr Anzeigen
            </h5>
          </Link>
        </div>

        <div className={styles.episodeGrid}>
          {randomMovie.map((episode) => (
            <li
              key={episode.id}
              className={styles.episodeCard}
            >
              <Link href={`/browse/${infos.type}/${infos.link_url}/episode/${episode.id}`}>
                <Image
                  src={episode.thumbnail || Episode}
                  className={styles.episodeImage}
                  alt='Episode'
                  width={300}
                  height={400}
                  priority
                />
                <p title={episode.title}>{truncateTitle(episode.title)}</p>
              </Link>
            </li>
          ))}
        </div>

      </main>
    </>
  )
}