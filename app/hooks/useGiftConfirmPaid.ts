import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../services/Firebase';

type Response = {
  uuid: string;
  file: string;
  mensagem: string;
  username: string;
};

export const useGiftConfirmPaid = () => {
  const [confirmPaid, setConfirmPaid] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const ref = collection(db, 'giftDestinatario');
    const ConfirmPaidArrayQuery = query(ref);

    const fetchGiftConfirmPaid = onSnapshot(ConfirmPaidArrayQuery, (querySnapshot) => {
      const confirmPaidArray: Response[] = [];

      querySnapshot.forEach((doc) => {
        confirmPaidArray.push({
          ...doc.data() as Response,
        });
      });

      setConfirmPaid(confirmPaidArray);
      setIsLoading(false);
      setError(null);
    });

    return () => {
      fetchGiftConfirmPaid();
    };
  }, []);

  return { confirmPaid, isLoading, error };
};
