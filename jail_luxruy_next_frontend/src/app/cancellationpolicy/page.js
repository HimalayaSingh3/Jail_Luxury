// app/cancellation-policy/page.js
export const runtime = 'edge';
import React from "react";
import PolicyLayout from "@/components/pageClients/policyLayout";

const cancellationContent = [
  {
    title: "Cancellation Policy",
    paragraphs: [
      "At Jail.Luxury, we strive to ensure that our customers are completely satisfied with their purchases. To make the process as smooth as possible, we offer an open box delivery service. This means that you have the opportunity to inspect the product at the time of delivery. If you find that the product does not meet your expectations during this open box delivery, you may cancel the order free of charge. Please note, however, that if the product is delivered and a few hours or more have passed before you decide that it is not to your liking, our cancellation and refund policies will no longer be applicable.",
    ],
  },
];

const CancellationPolicy = () => {
  return <PolicyLayout title="Cancellation Policy" content={cancellationContent} />;
};

export default CancellationPolicy;