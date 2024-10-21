import { createClient } from "@/prismicio";

export async function getGifts() {
  const prismic = createClient({});
  
  const responseGifts = await prismic.getByType('presentes');

  const resultsGifts = responseGifts.results.map(gift => {
    return {
      uid: gift.uid,
      data: {
        name: gift.data.name,
        category: gift.data.category,
        price: gift.data.price,
        isPaid: gift.data.is_paid,
        isForDelivery: gift.data.is_for_delivery,
        isArchived: gift.data.is_archoved,
        linkPaid: gift.data.link_paid,
        images: gift.data.images.map((item) => {
          return {
            url: item.url.url
          }
        }),
        referralLinks: gift.data.links_reference.map((item) => {
          return {
            label: item.label,
            href: item.href.text,
          }
        }),
      }
    };
  });

  const giftsPagination = {
    results: resultsGifts,
  };

  return {
    giftsPagination,
  };
};