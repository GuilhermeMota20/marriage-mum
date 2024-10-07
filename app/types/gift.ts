import { Image } from "./image";

interface Links {
  label: string;
  href: string;
};

export interface Gift {
  id: string;
  name: string;
  category: string;
  price: number;
  isForDelivery: boolean;
  isArchived: boolean;
  isPaid: boolean;
  images: Image[];
  referralLinks: Links[];
  linkPaid: string;
};