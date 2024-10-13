"use client";

import { TabsContent } from "@radix-ui/react-tabs";
import { columns } from "./columns";
import { DataTable } from "./data-table";

import FadeOut from "@/app/components/custom-ui/fade-out";
import { useGuests } from "@/app/hooks/useGuests";
import { Separator } from "@/app/components/ui/separator";

export default function TabContentControlRegister() {
  const { guests } = useGuests();

  return (
    <>
      <TabsContent value="guests">
        <FadeOut
          eixo="x"
          initialValueX={24}
          className="space-y-4 p-4 rounded-md bg-zinc-100 dark:bg-zinc-900"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Lista de convidados</h3>
              <p className="text-sm text-muted-foreground">
                Convidados que confirmaram presença.
              </p>
            </div>

            <Separator />
          </div>

          <div className="h-full flex-1 flex-col space-y-6 p-6 md:flex">
            <DataTable data={guests} columns={columns} />
          </div>
        </FadeOut>
      </TabsContent>
    </>
  )
};