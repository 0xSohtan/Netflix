import { useEffect } from 'react';
import { useRouter } from 'next/router';
import firebase from '@/utils/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useRequireAuth = (redirectUrl = '/login') => {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(firebase);
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) {
        router.push(redirectUrl);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  return;
};
