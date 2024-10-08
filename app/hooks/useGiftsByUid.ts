import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";

type Params = { uid: string };

export async function getGiftsByUid({ params }: { params: Params }) {
  const prismic = createClient({});

  const responseGift = await prismic
    .getByUID("presentes", params.uid)
    .catch(() => notFound());

  const resultGift = {
    uid: responseGift.uid,
    data: {
      name: responseGift.data.name,
      category: responseGift.data.category,
      price: responseGift.data.price,
      isPaid: responseGift.data.is_paid,
      isForDelivery: responseGift.data.is_for_delivery,
      isArchived: responseGift.data.is_archoved,
      linkPaid: responseGift.data.link_paid,
      images: responseGift.data.images.map((item) => {
        return {
          url: item.url.url
        }
      }),
      referralLinks: responseGift.data.links_reference.map((item) => {
        return {
          label: item.label,
          href: item.href.text,
        }
      }),
    }
  };

  return {
    resultGift,
  };
};