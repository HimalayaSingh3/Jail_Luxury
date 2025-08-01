// app/terms-condition/page.js
export const runtime = 'edge';
import PolicyLayout from "@/components/pageClients/policyLayout";
import React from "react";

// Static content for the Terms and Conditions page
const termsContent = [
  {
    title: "Introduction",
    paragraphs: [
      "Welcome to Jail.luxury. These Terms and Conditions (“Terms”) govern your use of our website and services provided by REXINE & LEATHER PRODUCT PRIVATE LIMITED. By accessing or using our website, you agree to comply with these Terms.",
    ],
  },
  {
    title: "Use of the Website",
    paragraphs: [
      "You must be at least 18 years old to use our website. You agree to use the website only for lawful purposes and in accordance with these Terms. We reserve the right to terminate or restrict your access to the website at any time without notice for any reason.",
    ],
  },
  {
    title: "Product Descriptions",
    paragraphs: [
      "We strive to provide accurate descriptions of our products. However, we do not warrant that the descriptions are complete or error-free. All prices are subject to change without notice.",
    ],
  },
  {
    title: "Orders and Payments",
    paragraphs: [
      "All orders placed through our website are subject to acceptance and availability. We reserve the right to refuse or cancel any order at our discretion. Payments must be made at the time of placing an order using the available payment methods.",
    ],
  },
  {
    title: "Intellectual Property",
    paragraphs: [
      "All content on Jail.luxury, including text, graphics, logos, images, and software, is the property of REXINE & LEATHER PRODUCT PRIVATE LIMITED and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works from any content on our website without our prior written consent.",
    ],
  },
  {
    title: "Limitation of Liability",
    paragraphs: [
      "To the fullest extent permitted by law, REXINE & LEATHER PRODUCT PRIVATE LIMITED shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products.",
    ],
  },
  {
    title: "Governing Law",
    paragraphs: [
      "These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in India.",
    ],
  },
  {
    title: "Changes to Terms",
    paragraphs: [
      "We reserve the right to modify these Terms at any time. Any changes will be posted on this page, and your continued use of the website after such changes constitutes acceptance of the new Terms.",
    ],
  },
];

// Component to render the Terms and Conditions page
const TermsCondition = () => {
  return <PolicyLayout title="Terms and Conditions" content={termsContent} />;
};

export default TermsCondition;