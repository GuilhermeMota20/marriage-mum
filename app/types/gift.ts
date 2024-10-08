import { Image } from "./image";

export interface Links {
  label: string;
  href: string;
};

export interface Gift {
  uid: string;
  data: {
    id: string;
    name: string;
    category: string;
    price: number;
    isForDelivery: boolean;
    isArchived: boolean;
    isPaid: boolean;
    images: Image[];
    referralLinks: Links[];
    linkPaid: {
      text: string;
    };
  }
};

export interface GiftsPagination {
  next_page: string;
  results: Gift[];
};