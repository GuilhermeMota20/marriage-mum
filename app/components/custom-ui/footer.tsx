import Link from "next/link"

export const Footer = () => {
  return (
    <>
      <footer className="flex items-center justify-center gap-6 w-full bg-white border-t-2 border-[#94A89C] px-2 py-6 md:p-8 lg:p-12 rounded-b-lg">
        <p className="font-light">
          © 2024 <Link className="font-bold" href="https://gmota.vercel.app/">gmotas</Link>. Todos os direitos reservados. Agradecemos por visitar nosso site!
        </p>
      </footer>
    </>
  )
}