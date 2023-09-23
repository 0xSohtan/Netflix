import Head from 'next/head';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function Admin() {

    useRequireAuth();

    return (
        <>
            <Head>
                <title>Admin | Netflix</title>
                <meta name="description" content="Admin Dashboard" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            Test
        </>
    )
}