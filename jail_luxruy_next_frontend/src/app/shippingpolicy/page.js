// app/shipping-policy/page.js
export const runtime = 'edge';
import React from "react";
import PolicyLayout from "@/components/pageClients/policyLayout";

const shippingContent = [
  {
    title: "Order Processing",
    paragraphs: [
      "All orders are processed within 2 days of receipt. You will receive a confirmation email once your order has been shipped.",
    ],
  },
  {
    title: "Shipping Time",
    paragraphs: [
      "Orders are typically delivered within 5 days after shipment.",
    ],
  },
  {
    title: "Shipping Charges",
    paragraphs: [
      "Shipping charges will be calculated at checkout and are based on your location and the weight of your order.",
    ],
  },
  {
    title: "Tracking Your Order",
    paragraphs: [
      "Once your order has been shipped, you will receive a tracking number to monitor the delivery status.",
    ],
  },
  {
    title: "International Shipping",
    paragraphs: [
      "Currently, we only ship within India. We do not offer international shipping at this time.",
    ],
  },
  {
    title: "Delays",
    paragraphs: [
      "Please note that delivery times may be extended due to unforeseen circumstances such as weather conditions or carrier delays.",
    ],
  },
  {
    title: "Changes to this Policy",
    paragraphs: [
      "We reserve the right to update this policy at any time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the updated policy.",
    ],
  },
];

const ShippingPolicy = () => {
  return <PolicyLayout title="Shipping Policy for Jail.luxury powered by REXINE & LEATHER PRODUCT PRIVATE LIMITED" content={shippingContent} />;
};

export default ShippingPolicy;