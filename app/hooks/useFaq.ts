import { createClient } from "@/prismicio";

export async function getFaq() {
  const prismic = createClient({});
  
  const responseFaq = await prismic.getByType('faq');

  const resultsFaq = responseFaq.results.map(faq => {
    return {
      uid: faq.uid,
      data: {
        faqs: faq.data.faqs.map((item) => {
          return {
            question: item.question,
            response: item.response,
          }
        }),
      }
    };
  });

  return {
    resultsFaq,
  };
};