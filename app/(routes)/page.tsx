import { Banner } from "../components/custom-ui/banner";
import { Contact } from "../components/custom-ui/contact";
import { Faq } from "../components/custom-ui/faq";
import { Footer } from "../components/custom-ui/footer";
import { Gift } from "../components/custom-ui/gift";
import { Header } from "../components/custom-ui/header";
import { Pressentation } from "../components/custom-ui/pressentation";
import { Resume } from "../components/custom-ui/resume";
import { Scroll } from "../components/custom-ui/scroll";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-[#F4F4F4] h-100 flex flex-col items-center rounded-md">
      <Header />

      <main className="flex flex-col p-2 md:p-8 lg:p-24 gap-32 w-full items-center sm:items-start">
        <section className="flex flex-col-reverse xl:grid xl:grid-cols-2">
          <Pressentation />
          <Banner />
        </section>

        <section className="w-full flex items-center justify-center">
          <Scroll />
        </section>

        <Resume />
        <Gift />
        <Contact />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}
