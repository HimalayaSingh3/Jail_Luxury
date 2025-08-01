// app/return-refund/page.js
export const runtime = 'edge';
import React from "react";
import PolicyLayout from "@/components/pageClients/policyLayout";

const returnRefundContent = [
  {
    title: "Return Policy",
    paragraphs: [
      "If you are not satisfied with your purchase, you may return the product within 5 days of delivery. To be eligible for a return, the item must be unused, in its original packaging, and in the same condition that you received it.",
    ],
  },
  {
    title: "Refund Policy",
    paragraphs: [
      "Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will be applied to your original method of payment within 10 days.",
    ],
  },
  {
    title: "Non-Returnable Items",
    paragraphs: [
      "Certain items, such as personalized or custom-made products, are not eligible for returns.",
    ],
  },
  {
    title: "How to Initiate a Return",
    paragraphs: [
      "To initiate a return, please contact our customer service at aadityaa.kumar3@gmail.com with your order details.",
    ],
  },
  {
    title: "Changes to this Policy",
    paragraphs: [
      "We reserve the right to update this policy at any time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the updated policy.",
    ],
  },
];

const ReturnRefund = () => {
  return <PolicyLayout title="Returns and Refunds Policy" content={returnRefundContent} />;
};

export default ReturnRefund;