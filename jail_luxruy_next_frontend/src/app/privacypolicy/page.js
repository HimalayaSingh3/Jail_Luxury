// app/privacy-policy/page.js
export const runtime = 'edge';
import React from "react";
import PolicyLayout from "@/components/pageClients/policyLayout";

const privacyContent = [
  {
    title: "Introduction",
    paragraphs: [
      "This Privacy Policy explains how REXINE & LEATHER PRODUCT PRIVATE LIMITED (“we,” “our,” or “us”) collects, uses, and protects your personal information when you visit Jail.luxury.",
    ],
  },
  {
    title: "Information We Collect",
    paragraphs: [
      "Personal Information: We may collect your name, email address, phone number, and payment information when you place an order or sign up for our services. Non-Personal Information: We may collect non-personal information such as your IP address, browser type, and browsing behavior on our website.",
    ],
  },
  {
    title: "How We Use Your Information",
    paragraphs: [
      "To process your orders and provide customer support. To send you updates, newsletters, and promotional materials. To improve our website and services based on user feedback and analytics.",
    ],
  },
  {
    title: "Sharing Your Information",
    paragraphs: [
      "We do not sell or rent your personal information to third parties. We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business. We may disclose your information if required by law or to protect our rights and safety.",
    ],
  },
  {
    title: "Cookies",
    paragraphs: [
      "Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may affect the functionality of our website.",
    ],
  },
  {
    title: "Security",
    paragraphs: [
      "We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure.",
    ],
  },
  {
    title: "Your Rights",
    paragraphs: [
      "You have the right to access, update, or delete your personal information. To do so, please contact us at aadityaa.kumar3@gmail.com.",
    ],
  },
  {
    title: "Changes to this Policy",
    paragraphs: [
      "We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page, and your continued use of the website constitutes acceptance of the updated policy.",
    ],
  },
];

const PrivacyPolicy = () => {
  return <PolicyLayout title="Privacy Policy" content={privacyContent} />;
};

export default PrivacyPolicy;