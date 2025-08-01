"use client"
import React from "react";
import { styled, Typography } from "@mui/material";


const HeaderBox = styled("div")(({ theme }) =>({
  backgroundColor: theme.palette.primary.main,
  width: "100%",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "18px",
  fontWeight: "bold",
  position: "fixed", // ✅ Makes it fixed at the top
  top: 55,
  left: 0,
  zIndex: 1000,
  color: theme.typography.color,
}));

const ContentWrapper = styled("div")(({ theme }) =>({
  maxWidth: "900px",
  margin: "auto",
  padding: "80px 20px 40px", // ✅ Adds top padding to prevent content overlap
  backgroundColor: theme.palette.background.paper,
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: "bold",
  marginTop: "30px", // ⬆️ Increased spacing between sections
  color: theme.typography.color,
}));

const Paragraph = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  lineHeight: "1.8", // ⬆️ Increased line height for better readability
  marginBottom: "16px", // ⬆️ Added more spacing between paragraphs
  color: theme.typography.color,
}));

const ContactInfo = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "bold",
  marginTop: "20px",
  color: theme.typography.color,
}));

const PolicyLayout = ({ title, content }) => {
  return (
    <div style={{ backgroundColor: "background.default", minHeight: "100vh" }}>
      {/* ✅ Fixed Header (Always stays on top) */}
      <HeaderBox>{title}</HeaderBox>

      {/* ✅ Main Content (Added Top Padding to Prevent Overlap) */}
      <ContentWrapper>
        {content.map((section, index) => (
          <div key={index}>
            <SectionTitle>{section.title}</SectionTitle>
            {section.paragraphs.map((text, idx) => (
              <Paragraph key={idx}>{text}</Paragraph>
            ))}
          </div>
        ))}

        {/* ✅ Contact Info (Same Design) */}
        <SectionTitle>Contact Information</SectionTitle>
        <ContactInfo>Mail Id: support@jail.luxury</ContactInfo>
        <ContactInfo>Call Us: 88 77 77 22 77</ContactInfo>
      </ContentWrapper>
    </div>
  );
};

export default PolicyLayout;