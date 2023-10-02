import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/Home.module.css';
import Episode from '@/public/Episodes.jpeg';
import truncateTitle from "@/utils/truncateTitle";

export default function Card({ title, thumbnail, url }) {
    return (
        <>
            <Link href={`${url}`}>
                <Image
                    width={300}
                    height={400}
                    src={thumbnail || Episode}
                    alt='Episode'
                    className={styles.episodeImage}
                    priority
                />
                <p title={title}>{truncateTitle(title)}</p>
            </Link>
        </>
    )
}