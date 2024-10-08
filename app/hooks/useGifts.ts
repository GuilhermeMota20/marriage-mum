import { createClient } from "@/prismicio";

function getPageNumberFromLink(nextPageLink: string | undefined): number | undefined {
  if (!nextPageLink) return undefined;

  const regex = /page=(\d+)/;
  const match = nextPageLink.match(regex);

  if (match && match.length > 1) {
    return parseInt(match[1], 10);
  }

  return undefined;
};

export async function getGifts(nextPage: number | null = null) {
  const prismic = createClient({});
  
  const responseGifts = await prismic.getByType('presentes', {
    pageSize: 6,
    page: nextPage ? getPageNumberFromLink(nextPage.toString()) : 1,
  });

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
    next_page: responseGifts?.next_page,
    results: resultsGifts,
  };

  return {
    giftsPagination,
  };
};