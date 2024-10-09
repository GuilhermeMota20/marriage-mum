export interface FaqType {
  uid: string;
  data: {
    faqs: {
      question: string;
      response: string;
    }[];
  };
}