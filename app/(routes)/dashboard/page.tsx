"use client";

import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { GiftIcon, UsersIcon } from "lucide-react";
import Header from "./_components/header";
import TabContentControlRegister from "./_components/tab-content-control-register";
import TabContentGifts from "./_components/tab-content-gifts";

export default function DashboardPage() {
  return (
    <>
      <Header />

      <main className="flex-col md:flex">
        <div className="relative flex-1 space-y-4 p-8 pt-6 mt-16">
          <div className="absolute w-full h-[300px] bg-[#94A89C] -top-20 left-0 -z-10" />

          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">Controle administrativo</h2>
          </div>

          <Tabs defaultValue="guests" className="space-y-4">
            <TabsList className="hidden md:inline-block">
              <TabsTrigger value="guests">
                Controle de convidados
              </TabsTrigger>
              <TabsTrigger value="gifts">
                Presentes doados
              </TabsTrigger>
            </TabsList>

            <div className="fixed md:hidden bottom-0 left-0 z-10 w-full flex items-center justify-center p-4">
              <TabsList className="w-full bg-[#94A89C] p-8 flex items-center justify-evenly text-slate-100 shadow-md">
                <TabsTrigger value="guests">
                  <UsersIcon />
                </TabsTrigger>
                <TabsTrigger value="gifts">
                  <GiftIcon />
                </TabsTrigger>
              </TabsList>
            </div>

            <TabContentControlRegister />
            <TabContentGifts />

            <div className="h-[70px] md:h-0" />
          </Tabs>
        </div>
      </main>
    </>
  )
}
