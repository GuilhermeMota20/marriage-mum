"use client"

import { Row } from "@tanstack/react-table"

import { Button } from "@/app/components/ui/button"

import { db } from "@/app/services/Firebase"
import { collection, deleteDoc, doc, onSnapshot, query, where } from "firebase/firestore"
import { UserRoundXIcon } from "lucide-react"
import { toast } from "sonner"
import { guestSchema } from "../data/schema"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
};

export function DataTableGuestRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const guest = guestSchema?.parse(row.original);

  const handleDeletedGuest = () => {
    const ref = collection(db, 'guests');
    const queryDeleted = query(ref, where('id', '==', guest?.id));

    try {
      onSnapshot(queryDeleted, (snapshot) => {
        snapshot.docs.forEach((task) => {
          deleteDoc(doc(db, 'guests', task?.id));
        });
      });
      toast.success(`A confirmação de presença do convidade ${guest?.username} foi cancelada com sucesso!`);

    } catch {
      toast.error(`Ocorreu um erro ao tentar cancelar a presença de ${guest?.username}.`);
    };
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleDeletedGuest} className="hover:text-red-500">
          <UserRoundXIcon className="w-4 h-4" />
        </Button>
      </div>
    </>
  )
}
