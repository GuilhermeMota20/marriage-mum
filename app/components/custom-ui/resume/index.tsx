"use client";

import { Cerimonia } from "./cerimonia";
import { Recepcao } from "./recepcao";

export const Resume = () => {
  return (
    <>
      <section className="w-full flex flex-col items-center lg:justify-center">
        <div id="resumo" className="mb-36" />
        <div className="md:w-3/4  bg-white shadow-2xl flex flex-col items-center justify-start gap-24 p-4 md:p-12 rounded-lg">
          <Cerimonia />
          <Recepcao />
        </div>
      </section>
    </>
  )
};