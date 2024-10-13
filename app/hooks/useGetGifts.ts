import { db } from '@/app/services/Firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// Defina o tipo Response antes de usar
type Response = {
  id: string;
  uuid: string;
  username: string;
  mensagem: string;
  createdAt: string;
  file: string;
};

export const useGetGifts = () => {
  const [gifts, setGifts] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ref = collection(db, 'giftDestinatario');
    const GiftsQuery = query(ref);

    const fetchGifts = onSnapshot(GiftsQuery, (querySnapshot) => {
      const guestArray: Response[] = [];

      querySnapshot.forEach((doc) => {
        guestArray.push({
          ...doc.data() as Response,
        });
      });

      setGifts(guestArray);
      setIsLoading(false);
      setError(null);
    });

    return () => {
      fetchGifts();
    };
  }, []);

  return { gifts, isLoading, error };
};
