import { db } from '@/app/services/Firebase';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

// Defina o tipo Response antes de usar
type Response = {
  id: string;
  username: string;
  createdAt: string;
};

export const useGuests = () => {
  const [guests, setGuests] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ref = collection(db, 'guests');
    const GuestsQuery = query(ref);

    const fetchGuests = onSnapshot(GuestsQuery, (querySnapshot) => {
      const guestArray: Response[] = [];

      querySnapshot.forEach((doc) => {
        guestArray.push({
          ...doc.data() as Response,
        });
      });

      setGuests(guestArray);
      setIsLoading(false);
      setError(null);
    });

    return () => {
      fetchGuests();
    };
  }, []);

  return { guests, isLoading, error };
};
