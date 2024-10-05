import { Resend } from 'resend';
import * as React from 'react';
import { ContactEmailTemplate } from '@/app/components/custom-ui/emailTemplate/contactMail';

const resend = new Resend(process.env.RESEND_API_KEY);
// const resend = new Resend("re_928Lryk2_7MLLsq3HKahsyghgYLbZkBDR");

export async function POST(req: Request) {
  try {
    const {
      para,
      // _email,
      mensagem,
      assunto
    } = await req.json();

    const { data, error } = await resend.emails.send({
      from: `Acme <onboarding@resend.dev>`,  // O email do remetente
      to: [para],  // Destinatário
      subject: assunto,  // Assunto do email
      react: ContactEmailTemplate({ firstName: mensagem }) as React.ReactElement, // Conteúdo do email
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    };

    return new Response(JSON.stringify({ data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Something went wrong' + error }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
