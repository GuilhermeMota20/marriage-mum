import FadeOut from "@/app/components/custom-ui/fade-out"
import { Separator } from "@/app/components/ui/separator"
import { TabsContent } from "@/app/components/ui/tabs"
import { DataTableGift } from "./data-table-gift"
import { columns } from "./columns-gift";
import { useGetGifts } from "@/app/hooks/useGetGifts";

export default function TabContentGifts() {
  const { gifts } = useGetGifts();

  return (
    <>
      <TabsContent value="gifts">
        <FadeOut
          eixo="y"
          initialValueY={24}
          className="space-y-4 p-4 rounded-md bg-zinc-100 dark:bg-zinc-900"
        >
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Presentes</h3>
              <p className="text-sm text-muted-foreground">
                Lista de presentes doados (aqueles que foram cadastrados com o envio de uma nota fiscal).
              </p>
            </div>

            <Separator />
          </div>

          <div className="h-full flex-1 flex-col space-y-6 p-6 md:flex">
            <DataTableGift data={gifts} columns={columns} />
          </div>
        </FadeOut>
      </TabsContent>
    </>
  )
}